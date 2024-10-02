Hej, och välkommen till blomaffären!

När ni startar sidan kommer getFlowers() köras, en funktion som fetchar alla blommor i databasen och renderar dem på sajten.
När ni skriver in information i sökfältet och trycker på sökknappen körs en selektiv get-request som skickar en query till databasen med:
search?q={söktext}; om sökfältet är tomt kommer alla blommor visas.

Om ni vill skicka information till databasen behöver ni skicka med en body. Ni gör det genom att skriva den som ett JavaScript-objekt och skicka iväg den med den här syntaxen:
const response = await fetch("http://localhost:1000/flowers",
{method: "POST",}
{body: JSON.stringify({ name: "example" })}
)

Ändra "POST" till metoden ni vill använda. Alternativen är "GET" (hämtar information från APIt), "POST" (skickar ett nytt objekt till databasen), "PUT" (ändrar på ett av objekten) och "DELETE" (raderar ett av objekten i databasen).

Ni måste ha med en body som matchar alla fält för POST, men ni behöver inte göra detta för PUT. (T.ex -- om ni vill skapa en ny blomma måste ni inkludera image, name, price och amountInStock, men om ni vill uppdatera priset behöver ni bara skicka med price.)

De olika strukturerna för objekt i databasen ser ut så här:
Cart: {
amount: number
}

Flower: {
name: string,
price: number,
image: string,
amountInStock: number
}

User: {
name: string,
isAdmin: boolean
}

Observera att om ni hämtar databasens collection i en console.log kommer ni se flera fält, bland annat _id, userId och productId. Dessa representeras av ObjectId, och läggs till automatiskt i databasen när ni skickar med en body -- inkludera ej _id, userId och productId i bodyn ni skapar för att skicka in.

Om ni vill hämta ett specifikt objekt antingen via GET, PUT eller DELETE måste ni använda objektets egna ObjectId; detta returneras från databasen under fältet '_id', och sätts efter URLen, alltså t.ex. 'flowers/{ObjectId}'.

REST-apierna att fetcha ifrån heter:
http://localhost:1000/carts
http://localhost:1000/flowers
http://localhost:1000/users

Lycka till, och njut av att puttra i våran kodträdgård! ✿

<!-- Grunderna till projeket är klart 

API FUNKTIONER
insomnia ! : 
kundvagnen: 
rest carts: http://localhost:1000/carts


produkterna:
rest flowers: http://localhost:1000/flowers

Users:
rest user: http://localhost:1000/users
 -->
