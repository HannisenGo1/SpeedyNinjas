Hej, och välkommen till blomaffären!

## Allmän information

När ni startar sidan kommer getFlowers() köras, en funktion som fetchar alla blommor i databasen och renderar dem på sajten.
När ni skriver in information i sökfältet och trycker på sökknappen körs en selektiv get-request som skickar en query till databasen med:
search?q={söktext}; om sökfältet är tomt kommer alla blommor visas.

Om ni vill skicka information till databasen behöver ni skicka med en body. Ni gör det genom att skriva den som ett JavaScript-objekt och skicka iväg den med den här syntaxen:
```js
const response = await fetch("/flowers",
    {method: EXAMPLE,}
    {body: JSON.stringify({ name: "example" })}
)
```

Ändra "EXAMPLE" till metoden ni vill använda. Alternativen är "GET" (hämtar information från APIt), "POST" (skickar ett nytt objekt till databasen), "PUT" (ändrar på ett av objekten) och "DELETE" (raderar ett av objekten i databasen); exempel finns nedan.

## Objektstruktur

De olika strukturerna för objekt i databasen ser ut så här:
```js
Cart: {
amount: number
}
```

```js
Flower: {
name: string,
price: number,
image: string,
amountInStock: number
}
```

```js
User: {
name: string,
isAdmin: boolean
}
```

Observera att om ni hämtar databasens collection i en console.log kommer ni se flera fält, bland annat _id, userId och productId. Dessa representeras av ObjectId, och läggs till automatiskt i databasen när ni skickar med en body -- inkludera ej _id, userId och productId i bodyn ni skapar för att skicka in.

Om ni vill hämta ett specifikt objekt antingen via GET, PUT eller DELETE måste ni använda objektets egna ObjectId; detta returneras från databasen under fältet '_id', och sätts efter URLen, alltså t.ex. 'flowers/{ObjectId}'.

REST-apierna att fetcha ifrån heter:
```
/carts
/flowers
/users
```

---

## GET /flowers
Hämta alla blom-objekt.

```js
const response = await fetch('/flowers')
const flowers: Flower[] = await response.json()
```

## GET /flowers/:id

Hämta ett specifikt blom-objekt.

```js
const response = await fetch('/flowers/:id')

//Exempel på specifik blomhämtning:
const response = await fetch('/flowers/66fd2a9d040e7f50dcb738e4').

//Förväntat resultat:
{
    _id: 66fd2a9d040e7f50dcb738e4,
    name: "Lily",
    price: 14.25,
    image: "https://februarybloom.com/cdn/shop/products/IMG_3448_530x.jpg?v=1662614773",
    amountInStock: 25
}
```

## POST /flowers
Lägg till ett nytt blom-objekt. Requestet måste inkludera med request body, och måste inkludera alla objektets fält ifyllda enligt objektstrukturen ovan.

```js
//Exempel på ett POST-request:

const response = await fetch("/flowers",
    {method: "POST",}
    {body: {
        name: "Dandelion",
        price: 7.49,
        image: "example.com/dandelion.jpg"
        amountInStock: 1
     }}
)

```

## PUT /flowers/:id

Uppdaterar egenskaperna för ett specifikt blom-objekt. Body måste inkludera minst en egenskap som ska ändras.

```js
//Exempel på ett PUT-request:

const response = await fetch("/flowers/:id",
    {method: "PUT",}
    {body: {
        name: "Lily of the Valley"
     }}
)

```

## DELETE /flowers/:id

Raderar ett specifikt blom-objekt från databasen. Body behöver inte inkluderas.

```js
//Exempel på ett DELETE-request:

const response = await fetch("/flowers/:id",
    {method: "DELETE",}
)

```

 
---

*Dessa funktioner gäller också för /carts och /users; ersätt '/flowers/' i URLen med '/carts' eller '/users' och ersätt egenskaperna i body med dess relevanta objektstruktur (se ovan).*

Lycka till, och njut av att puttra i våran kodträdgård! ✿