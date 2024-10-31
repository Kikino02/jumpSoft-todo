# To-Do Aplikácia

Jednoduchá aplikácia pre správu úloh s funkciami pridávania, aktualizácie stavu a odstraňovania úloh.

## Inštalácia a Spustenie

1. **Klonovanie Repozitára**  
   Klonujte tento repozitár na váš lokálny počítač:
   ```bash
   git clone [adresa-repozitára]
   ```
2. **Inštalácia Závislostí**
   ```bash
   cd nazov-vasho-projektu
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

Správa úloh: Aplikácia poskytuje Zoznam úloh rozdelený do troch stĺpcov – "To Do", "In Progress" a "Done". Každá úloha môže cyklovať medzi týmito stavmi po stlačení tlačidla ("Start" sa zmení na "Finish" a následne na "Restart").

Pridanie úloh: Používatelia môžu pridávať nové úlohy kliknutím na tlačidlo "Pridať", ktoré otvorí modálne okno s formulárom. Formulár umožňuje zadať názov, popis, dátum a úroveň priority (Vysoká, Stredná, Nízka).

Odstránenie úlohy: Každá úloha obsahuje tlačidlo na odstránenie, ktoré umožňuje používateľom odstrániť úlohy zo zoznamu.

Filtrovanie úloh podľa stavu: Úlohy sú zobrazované v príslušných stĺpcoch podľa ich stavu, čo poskytuje jasný prehľad o jednotlivých fázach úloh.

## Rozšírené Funkcie (voliteľné)

Indikátor Priority: Každá úloha obsahuje farebný štítok priority, ktorý používateľom umožňuje rýchlo posúdiť dôležitosť úlohy.

Zobrazenie Dátumu a Odpočítavanie Dní: Dátum úlohy sa zobrazuje s odpočítavaním dní a farebným označením podľa naliehavosti termínu.

Modálne Okno pre Detaily Úlohy: Používatelia môžu zobraziť alebo upraviť detaily úlohy v modálnom okne.

Validácia Formulára: Základná validácia formulára zabezpečuje, že všetky povinné polia sú vyplnené pred odoslaním.
