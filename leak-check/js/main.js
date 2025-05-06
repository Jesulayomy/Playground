document.querySelector('button').addEventListener('click', getLeaks);

function getLeaks() {
  const param = document.querySelector('input').value;
  fetch(`https://corsproxy.io/?url=https://leakcheck.net/api/public?check=${param}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const sites = document.querySelector('section.sites')
        sites.innerHTML = '';
        sites.innerHTML += `<p> Your credentials ${param} have been leaked on ${data.found}+ sites. Data includes: ${data.fields.join(', ')}.</p><br />`
        data.sources.forEach(source => {
          sites.innerHTML += `
            <div class="site">
              <h6>${source.date}</h6>
              <h4>${source.name}</h4>
            </div>
          `
        });
      }
    })
}











let dat = {
  "success": true,
  "found": 1000,
  "fields": [
      "origin",
      "ip",
      "country",
      "first_name",
      "name",
      "address",
      "zip",
      "dob",
      "username",
      "last_name",
      "password",
      "phone",
      "gender"
  ],
  "sources": [
      {
          "name": "Warmane.com",
          "date": "2016-12"
      },
      {
          "name": "Onebip.com",
          "date": "2017-09"
      },
      {
          "name": "Wishbone.io",
          "date": "2020-01"
      },
      {
          "name": "Atraf.co.il",
          "date": "2021-10"
      },
      {
          "name": "Leet.cc",
          "date": "2016-01"
      },
      {
          "name": "gcmdistributor.com",
          "date": ""
      },
      {
          "name": "tdtachristianmatrimony.com",
          "date": ""
      },
      {
          "name": "calligaris.es",
          "date": ""
      },
      {
          "name": "Loveplanet.ru",
          "date": "2014-11"
      },
      {
          "name": "truthordarepal.com",
          "date": ""
      },
      {
          "name": "Zoosk.com",
          "date": "2011-01"
      },
      {
          "name": "Glofox.com",
          "date": "2020-10"
      },
      {
          "name": "BrandNewTube.com",
          "date": "2020-10"
      },
      {
          "name": "roseindia.net",
          "date": ""
      },
      {
          "name": "Instaforex.com",
          "date": ""
      },
      {
          "name": "Last.fm",
          "date": "2012-07"
      },
      {
          "name": "Akiba-Heroine.com",
          "date": ""
      },
      {
          "name": "Scentbird.com",
          "date": "2020-06"
      },
      {
          "name": "Powerbot.org",
          "date": "2014-09"
      },
      {
          "name": "ve.councilforeconed.org",
          "date": ""
      },
      {
          "name": "lhworld.jp",
          "date": ""
      },
      {
          "name": "uniondeexportadores.com",
          "date": ""
      },
      {
          "name": "Fitbit.com",
          "date": ""
      },
      {
          "name": "DTBooterCompilation",
          "date": ""
      },
      {
          "name": "LeKoolGames.com",
          "date": "2019-12"
      },
      {
          "name": "gamesfuckgirls.com",
          "date": ""
      },
      {
          "name": "BitcoinSecurity",
          "date": "2014-01"
      },
      {
          "name": "Stealer Logs",
          "date": ""
      },
      {
          "name": "ClixSense.com",
          "date": "2016-07"
      },
      {
          "name": "cambridge.edu.au",
          "date": ""
      },
      {
          "name": "Elance.com",
          "date": "2009-01"
      },
      {
          "name": "Lookbook.nu",
          "date": "2016-04"
      },
      {
          "name": "Badoo.com",
          "date": "2013-07"
      },
      {
          "name": "VK.com",
          "date": "2012-01"
      },
      {
          "name": "LBSG.net",
          "date": "2016-01"
      },
      {
          "name": "Dropbox.com",
          "date": "2012-07"
      },
      {
          "name": "Scam.com",
          "date": "2015-11"
      },
      {
          "name": "newemotion.it",
          "date": ""
      },
      {
          "name": "Tout.com",
          "date": "2014-09"
      },
      {
          "name": "qww.sangeethouse.com",
          "date": ""
      },
      {
          "name": "MyHeritage.com",
          "date": "2017-10"
      },
      {
          "name": "Collection 1",
          "date": "2019-01"
      },
      {
          "name": "Roll20.net",
          "date": "2018-12"
      },
      {
          "name": "EyeEm.com",
          "date": "2018-02"
      },
      {
          "name": "thaiacoustic.com",
          "date": ""
      },
      {
          "name": "Romwe.com",
          "date": "2017-11"
      },
      {
          "name": "Whitepages.com",
          "date": "2016-06"
      },
      {
          "name": "Petflow.com",
          "date": "2017-12"
      },
      {
          "name": "calligaris.at",
          "date": ""
      },
      {
          "name": "CouponMom / ArmorGames",
          "date": "2014-02"
      },
      {
          "name": "Forum.Warmane.com",
          "date": "2016-11"
      },
      {
          "name": "Canva.com",
          "date": "2019-05"
      },
      {
          "name": "Bolt.cd",
          "date": "2017-03"
      },
      {
          "name": "ArmyForceOnline.com",
          "date": "2016-05"
      },
      {
          "name": "ClearVoiceSurveys.com",
          "date": "2015-07"
      },
      {
          "name": "Armynavydeals.com",
          "date": "2017-11"
      },
      {
          "name": "ID.Zing.vn",
          "date": ""
      },
      {
          "name": "iMesh.com",
          "date": "2013-09"
      },
      {
          "name": "Brazzers.com",
          "date": "2013-04"
      },
      {
          "name": "CrackingForum.com",
          "date": "2014-11"
      },
      {
          "name": "Vps.it",
          "date": "2017-11"
      },
      {
          "name": "Unmined.io",
          "date": "2020-10"
      },
      {
          "name": "Hautelook.com",
          "date": "2018-08"
      },
      {
          "name": "Nihonomaru.net",
          "date": "2015-03"
      },
      {
          "name": "Viperc.net",
          "date": ""
      },
      {
          "name": "tickets.peoplesrepublicofcork.com",
          "date": ""
      },
      {
          "name": "Swvl.com",
          "date": "2020-06"
      }
  ]
}