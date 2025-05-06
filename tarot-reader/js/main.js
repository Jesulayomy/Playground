let selected = 0;
let tarots;

fetch('https://tarotapi.dev/api/v1/cards/random?n=3')
  .then(res => res.json())
  .then(data => {
    tarots = data.cards;
  });

document.querySelectorAll('div.card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (selected < 3) {
      const select = card.classList.toggle('selected');
      if (select) selected += 1; else selected -= 1;
    }
  });
});


document.querySelector('button').addEventListener('click', async () => {
  if (selected == 3) {
    const resultsSection = document.querySelector('.results');
    resultsSection.innerHTML = ''
    tarots.forEach(tarot => {
      getCard(tarot);
    })
  } else {
    alert(`Choose ${3 - selected} more cards`);
  }
});


async function getCard(tarot) { 
  const data = {
    "contents": [{
      "parts": [
        {
          "text": `
            Generate a tarot card, the Value must be written at the top in roman digits and the Name at the bottom in it's own section without merging with the card, image dimensions must be 400x600 in size, the art style should be similar to Araki's Jojo's bizzare adventure manga, keep the color pallete to gold background, red black white and gold (rgb(205, 161, 92)) for colors, and black text for the roman numerals and name.
            - Value: ${tarot.value_int}
            - Name: ${tarot.name} 
            - Description: ${tarot.desc}
          `
        }
      ]
    }],
    "generationConfig":{"responseModalities":["Text","Image"]}
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const sample = document.querySelector('input').value;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${sample}`;
  await fetch(url, options)
    .then(res => res.json())
    .then(data => {
      const inlineData = data.candidates[0].content.parts[0].inlineData.data;

      const imageUrl = `data:image/png;base64,${inlineData}`;

      const img = document.createElement('img');
      img.classList.add('result');
      img.src = imageUrl;
      img.alt = `${tarot.desc}`;

      const resultsSection = document.querySelector('.results');
      resultsSection.appendChild(img);
    })
    .catch(error => console.error('Error:', error));
};