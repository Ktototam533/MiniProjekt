let ideen = [
  {
    id: 1,
    titel: "Mehr Sitzplätze im Schulhof",
    beschreibung: "Im Schulhof wären zusätzliche Bänke hilfreich.",
    kategorie: "Pausen",
    nickname: "LernEule",
    stimmen: 4
  },
  {
    id: 2,
    titel: "Mehr Fahrradständer",
    beschreibung: "Es sollte mehr sichere Fahrradständer geben.",
    kategorie: "Schulgebäude",
    nickname: "SchulFuchs",
    stimmen: 7
  }
];

const abgestimmteIdeen = new Set();

const ideenListe = document.querySelector("#ideen-liste");
const kategorieFilter = document.querySelector("#kategorie-filter");
const formular = document.querySelector("#ideen-formular");

function zeigeIdeen() {
  ideenListe.replaceChildren();

  const ausgewaehlteKategorie = kategorieFilter.value;

  const gefilterteIdeen = ideen
    .filter((idee) => {
      return ausgewaehlteKategorie === "alle" ||
        idee.kategorie === ausgewaehlteKategorie;
    })
    .sort((a, b) => b.stimmen - a.stimmen);

  gefilterteIdeen.forEach((idee) => {
    const karte = document.createElement("article");
    karte.className = "idee-karte";

    const titel = document.createElement("h3");
    titel.textContent = idee.titel;

    const beschreibung = document.createElement("p");
    beschreibung.textContent = idee.beschreibung;

    const details = document.createElement("p");
    details.textContent =
      `Kategorie: ${idee.kategorie} · Von: ${idee.nickname} · Stimmen: ${idee.stimmen}`;

    const abstimmButton = document.createElement("button");
    abstimmButton.textContent = abgestimmteIdeen.has(idee.id)
      ? "Abgestimmt"
      : "Abstimmen";

    abstimmButton.disabled = abgestimmteIdeen.has(idee.id);

    abstimmButton.addEventListener("click", () => {
      idee.stimmen++;
      abgestimmteIdeen.add(idee.id);
      zeigeIdeen();
    });

    karte.append(titel, beschreibung, details, abstimmButton);
    ideenListe.append(karte);
  });
}

kategorieFilter.addEventListener("change", zeigeIdeen);

formular.addEventListener("submit", (event) => {
  event.preventDefault();

  const neueIdee = {
    id: Date.now(),
    titel: document.querySelector("#titel").value.trim(),
    beschreibung: document.querySelector("#beschreibung").value.trim(),
    kategorie: document.querySelector("#kategorie").value,
    nickname: "Du",
    stimmen: 0
  };

  ideen.push(neueIdee);
  formular.reset();
  zeigeIdeen();
});

zeigeIdeen();