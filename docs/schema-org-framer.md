# Schema.org JSON-LD für Framer (Task #7)

## Wo einfügen

Framer Site Settings → **Code** → **End of Body** → Add Script

## Script

**WICHTIG: Das `<script>`-Tag muss mit rein — du fügst das in ein HTML-Feld ein, nicht in ein reines JS-Feld.**

```html
<script>
(function(){
var p={};
p['@type']='Person';
p['name']='Raphael Baruch';
p['jobTitle']='Executive Sparringspartner mit Geschäftsführungserfahrung';
p['url']='https://raphaelbaruch.com';
p['sameAs']=[
'https://www.linkedin.com/in/raphael-baruch/'
];
p['description']='Executive Sparringspartner mit Geschäftsführungserfahrung in DACH.';
var sv={};
sv['@type']='ProfessionalService';
sv['name']='Executive Sparring für Führungskräfte';
sv['url']='https://raphaelbaruch.com/sparring';
sv['description']='Executive Sparring für GF und C-Level.';
sv['areaServed']=['DE','AT','CH'];
sv['serviceType']='Executive Sparring';
var d={};
d['@context']='https://schema.org';
d['@graph']=[p,sv];
var s=document.createElement('script');
s.type='application/ld+json';
s.text=JSON.stringify(d);
document.head.appendChild(s);
})();
</script>
```

## Testen

Nach Save + Publish auf **[validator.schema.org](https://validator.schema.org)** testen — nicht Google Rich Results Test (der zeigt Person/ProfessionalService nicht an).

## Warum dieser Ansatz

Framer's Code-Editor bricht lange Zeilen automatisch um und fügt dabei echte Newline-Zeichen in JavaScript-String-Literale ein → SyntaxError. Diese Version baut das JSON-Objekt Eigenschaft für Eigenschaft auf, sodass keine Zeile länger als ~50 Zeichen ist.
