import React from 'react'

export default function About() {
    return (
        <section className="about">
            <h2>Over dit project</h2>
            <p>Tijdens dit project ben ik opzoek gegaan naar bepaalde verbanden, verbanden die zouden kunnen aantonen dat rijke gebieden voorgetrokken worden, of juist achterblijven bij de overheid.</p>
            <h3>Lege waardes</h3>
            <p>Lege waardes kunnen onstaan door niet beschikbare data, data die niet valide is en ontransformeerbaar of data die als onrealistisch wordt beschouwd. In dit project is alle data beschouwd als realistisch, maar worden lege waardes standaard op 0 gezet. Geen parkeergroei betekent dus niet perse dat de plaats geen parkeerautomaten heeft, maar dat deze data niet beschikbaar is. Dit geldt voor alle gebruikte variabelen. Steden zonder valide data worden niet meegenomen in de data.</p>
            <h3>Conclusie</h3>
            <p>Uit de onderzochte data is geen relevant verband gebleken. Er lijkt een hoge correlatie te zijn tussen een laag vermogen en een lage uurprijs, en de groei van parkeerautomaten. Maar er kan niet aangetoond worden dat het een het ander veroorzaakt.</p>
            <p>Dit is ook te danken aan het feit dat de data incompleet oogt.</p>
        </section>
    )
}
