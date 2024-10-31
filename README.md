# To-Do Aplikácia

Jednoduchá aplikácia pre správu úloh s funkciami pridávania, aktualizácie stavu a odstraňovania úloh.

## Inštalácia a Spustenie

1. **Klonovanie Repozitára**  
   Naklonujte tento repozitár na váš lokálny počítač:
   ```bash
   git clone [adresa-repozitára]
   ```
2. **Inštalácia Závislostí**
   ```bash
   cd nazov-vášho-projektu
   npm install
   ```
3. **Spustenie Vývojového Servera**
   ```bash
   npm run dev
   ```
4. **Otvorenie v Prehliadači**
   ```bash
   http://localhost:3000
   ```

## Funkcie Aplikácie

Správa úloh: Aplikácia poskytuje Zoznam úloh rozdelený do troch stĺpcov – "To Do", "In Progress" a "Done". Každá úloha sa môže hýbať medzi týmito stavmi po stlačení tlačidla ("Start" sa zmení na "Finish" a následne na "Restart").

Pridanie úloh: Používatelia môžu pridávať nové úlohy kliknutím na tlačidlo "Add", ktoré otvorí modálne okno s formulárom.

Odstránenie úlohy: Každá úloha obsahuje tlačidlo na odstránenie, ktoré umožňuje používateľom odstrániť úlohy zo zoznamu.

Filtrovanie úloh podľa stavu: Úlohy sú zobrazované v stĺpcoch podľa ich stavu.

## Rozšírené Funkcie (voliteľné)

Indikátor Priority: Každá úloha obsahuje farebný štítok priority.

Zobrazenie Dátumu a Odpočítavanie Dní: Dátum úlohy sa zobrazuje s odpočítavaním dní a farebným označením podľa ostávajúcich dní.

Modálne Okno pre Detaily Úlohy: Používatelia môžu zobraziť alebo upraviť detaily úlohy v modálnom okne.

Validácia Formulára: Základná validácia formulára zabezpečuje, že všetky polia sú povinné.

Počítadlo Zostávajúcich Úloh: Zobrazuje počet zostávajúcich úloh v stĺpcoch "To Do" a "In Progress", ktoré ešte treba dokončiť. V stĺpci "Done" zobrazuje počet splnených úloh. Ak sú úlohy splnené všetky, stĺpec "Done" zobrazí, že ste splnili všetky úlohy.
