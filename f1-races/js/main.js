document.getElementById('submitQuery').addEventListener('click', getMeetings);

function getMeetings() {
  const year = Number(document.querySelector('#year').value);
  const country = document.querySelector('#country').value;
  let q = '?';
  q += `year=${year || 2025}&`;
  if (country) {
    q += `country_name=${country}&`;
  } else {
    if (year != 2025) {
      alert('You must also enter a country for older years!');
      return;
    }
  }
  const url = 'https://api.openf1.org/v1/meetings';
  fetch(url + q)
    .then(res => {
      if (res.status === 429) {
        console.warn('Rate limit exceeded for meetings request');
        return [];
      }
      return res.json();
    })
    .then(meetings => {
      const sessionPromises = meetings.map(meeting => {
        return fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meeting.meeting_key}`)
          .then(res => {
            if (res.status === 429) {
              console.warn('Rate limit exceeded for sessions request');
              return [];
            }
            return res.json();
          })
          .then(sessions => {
            const sessionDataPromises = sessions.map(session => {
              const weatherPromise = fetch(`https://api.openf1.org/v1/weather?session_key=${session.session_key}`)
                .then(res => {
                  if (res.status === 429) {
                    console.warn('Rate limit exceeded for weather request');
                    return null;
                  }
                  return res.json();
                })
                .then(weather => weather ? weather[weather.length - 1] : { rainfall: 0, humidity: 0, track_temperature: 0, air_temperature: 0, wind_direction: 0, wind_speed: 0 });

              const positionPromise = fetch(`https://api.openf1.org/v1/position?session_key=${session.session_key}`)
                .then(res => {
                  if (res.status === 429) {
                    console.warn('Rate limit exceeded for position request');
                    return [];
                  }
                  return res.json();
                });

              return Promise.all([weatherPromise, positionPromise]).then(([weather, positions]) => {
                session.weather = weather;
                session.finalPositions = getFinalPositions(positions);
                return session;
              });
            });

            return Promise.all(sessionDataPromises).then(sessionData => {
              meeting.sessions = sessionData;
              return meeting;
            });
          })
          .catch(err => {
            console.error('Error fetching sessions:', err);
            return meeting;
          });
      });

      return Promise.all(sessionPromises);
    })
    .then(meetingsWithData => {
      const meetingsContainer = document.querySelector('.meetings');
      meetingsContainer.innerHTML = '';

      meetingsWithData.forEach(meeting => {
        const meetingDiv = document.createElement('div');
        meetingDiv.classList.add('meeting');

        const roadClasses = ['road1', 'road2', 'road3', 'road4'];
        const randomClass = roadClasses[Math.floor(Math.random() * roadClasses.length)];
        meetingDiv.classList.add(randomClass);
        meetingDiv.innerHTML = `
          <h3>${meeting.meeting_official_name}</h3>
          <h5>Circuit Name: ${meeting.circuit_short_name}</h5>
          <h5>${new Date(meeting.date_start).toLocaleString()}</h5>
          <h6>${meeting.location}, ${meeting.country_name}</h6>
          <div class="sessions">
            ${meeting.sessions.map(session => `
              <div class="session" key=${session.session_key}>
                <h4>${session.session_name}</h4>
                <h5>${new Date(session.date_start).toLocaleString()} - ${new Date(session.date_end).toLocaleString()}</h5>
                <h6>
                  <ul>
                    <li class="rain">${session.weather.rainfall > 0 ? 'Rainfall' : 'No Rain'} (${session.weather.rainfall}) | ${session.weather.humidity}%</li>
                    <li class="temp"><span>${session.weather.track_temperature}°C</span> | <span>${session.weather.air_temperature}°C</span></li>
                    <li class="wind">${session.weather.wind_direction}° | ${session.weather.wind_speed} m/s</li>
                  </ul>
                  <ol>
                    ${!session.finalPositions ? '' : session.finalPositions.map(position => `
                      <li>${position.position}: Driver ${position.driver_number}</li>
                    `).join('')}
                  </ol>
                </h6>
              </div>
            `).join('')}
          </div>
        `;
        meetingsContainer.appendChild(meetingDiv);
      });

      document.querySelectorAll('.meeting').forEach(meeting => {
        meeting.addEventListener('click', () => {
          const sessions = meeting.querySelector('.sessions');
          if (sessions) {
            sessions.style.display = sessions.style.display === 'block' ? 'none' : 'block';
          }
        });
      });
      document.querySelectorAll('.session').forEach(session => {
        session.addEventListener('click', async (event) => {
          event.stopPropagation();
          const positions = session.querySelector('ol');
          if (positions) {
            const sessionKey = session.getAttribute('key');
            try {
              const driverResponse = await fetch(`https://api.openf1.org/v1/drivers?session_key=${sessionKey}`);
              const drivers = await driverResponse.json();

              const driverMap = drivers.reduce((map, driver) => {
                map[driver.driver_number] = driver.broadcast_name;
                return map;
              }, {});

              const popoverList = popover.querySelector('ol');
              popoverList.innerHTML = Array.from(positions.children).map(li => {
                const driverNumber = li.textContent.match(/Driver (\d+)/)?.[1];
                const broadcastName = driverMap[driverNumber] || 'Unknown Driver';
                return `<li>${li.textContent} - ${broadcastName}</li>`;
              }).join('');

              popover.style.display = 'block';
              overlay.style.display = 'block';
            } catch (err) {
              console.error('Error fetching driver data:', err);
            }
          }
        });
      });
    })
    .catch(err => {
      console.error(err);
    });
}

function getFinalPositions(data) {
  const latestPositions = {};

  data.forEach(entry => {
    const { driver_number, date } = entry;
    if (!latestPositions[driver_number] || new Date(date) > new Date(latestPositions[driver_number].date)) {
      latestPositions[driver_number] = entry;
    }
  });
  return Object.values(latestPositions).sort((a, b) => a.position - b.position);
}


const popover = document.createElement('div');
popover.classList.add('popover');
popover.innerHTML = `
  <button class="close-btn">Close</button>
  <h3>Final Positions</h3>
  <ol></ol>
`;
document.body.appendChild(popover);

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

popover.querySelector('.close-btn').addEventListener('click', () => {
  popover.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  popover.style.display = 'none';
  overlay.style.display = 'none';
});
