db.types.insert([
    {
        "name": "tamna",
    },
    {
        "name": "bijela",
    },
    {
        "name": "mlijecna",
    },
    {
        "name": "organska",
    },
    {
        "name": "s dodacima"
    }
])

db.producers.insert([
    {
        "name": "Nadalina",
        "year": "1990",
        "country": "Hrvatska, Split",
        "description": "...",
        "logo":"https://elevator.hr/galleria/images/clients/100-NADALINA/01-Nadalina-Logo-Website.jpg"
    },
    {
        "name": "Taman",
        "year": "2015",
        "country": "Hrvatska, Zagreb",
        "description": "Proizvodnji pristupamo na suvremen način koristeći moderna znanja, ali ju temeljimo na tradicionalnim metodama u proizvodnji vrhunskih čokoladnih proizvoda.Za Gourmet čokolade, praline i trufflese koristimo čokolade (bez dodanih biljnih i hidrogeniziranih ulja) koje su pomno odabrane iz asortimana vrhunskih proizvođača. Osim čokolada, u proizvodnji koristimo i druge, isključivo visokokvalitetne namirnice kao što su: nerafinirani smeđi šećeri iz ekološkog uzgoja, čista prirodna eterična ulja, ekološki uzgojene začini, prehrambene boje dobivene iz prirodnih izvora i sl..",
        "logo":"https://tamanchocolates.com/wp-content/uploads/2021/09/taman-logo.png"
    },
    {
        "name": "Hedona",
        "year": "2013",
        "country": "Hrvatska, Križevci",
        "description": "Hedona je svoju slatku priču započela u 60 kvadrata i sa 6 zaposlenih, od kojih su 4 djelatnika bila s invaliditetom. Ideje mijenjaju svijet, u našem slučaju, čine ga slađim i tolerantnijim. Mi ističemo i naglašavamo razvojne potencijale svojih djelatnika, a dobit koju društveno poduzeće ostvaruje, reinvestiramo upravo kroz njihovu edukaciju, razvoj i rast.",
        "logo": "https://hedona.hr/wp-content/uploads/2020/08/logocrno.png"
    },
    {
        "name": "Milka",
        "year": "1901",
        "country": "Švicarska",
        "description": "Kakao koji koristimo za proizvodnju naše Milka čokolade od alpskog mlijeka potječe od plodova stabla kakaovca. Stabla kakaovca rastu u području ekvatorijalnog pojasa. Najvažnije regije uzgoja iz kojih dobavljamo kakao jesu Obala Bjelokosti i Gana te Indija, Indonezija, Brazil i Dominikanska Republika.",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Milka_purple_logo18.svg/640px-Milka_purple_logo18.svg.png"
    }

])

db.chocolates.insert([
    {
        "name": "Almond",
        "price": "3",
        "image": "https://www.nadalina.hr/wp-content/uploads/Almond.jpg",
        "cacao_percentage": "70%",
        "milk_percentage": "15%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Carob",
        "price": "2,5",
        "image": "https://www.nadalina.hr/wp-content/uploads/Carob.jpg",
        "cacao_percentage": "75%",
        "milk_percentage": "10%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""

    },
    {
        "name": "Lavender",
        "price": "3,18",
        "image": "https://www.nadalina.hr/wp-content/uploads/Lavender.jpg",
        "cacao_percentage": "50%",
        "milk_percentage": "30%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Peper",
        "price": "2,60",
        "image": "https://www.nadalina.hr/wp-content/uploads/Pepper.jpg",
        "cacao_percentage": "60%",
        "milk_percentage": "20%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""

    }, 
    {
        "name": "Nutmeg",
        "price": "3",
        "image": "https://www.nadalina.hr/wp-content/uploads/Nutmeg.jpg",
        "cacao_percentage": "70%",
        "milk_percentage": "10%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Naranča, papar i timijan",
        "price": "3",
        "image": "https://tamanchocolates.com/wp-content/uploads/2023/03/833-tamna62-aoc-1024x1024.jpg",
        "cacao_percentage": "62%",
        "milk_percentage": "18%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""

    },
    {
        "name": "Kava i kardamon",
        "price": "4",
        "image": "https://tamanchocolates.com/wp-content/uploads/2023/03/834-tamna60-aoc-1024x1024.jpg",
        "cacao_percentage": "60%",
        "milk_percentage": "25%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Limun i Bourbon vanilija",
        "price": "4,20",
        "image": "https://tamanchocolates.com/wp-content/uploads/2023/03/834-tamna60-aoc-1024x1024.jpg",
        "cacao_percentage": "34%",
        "milk_percentage": "45%",
        "color": "bijela",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Pečeni lješnjaci i cvijet soli",
        "price": "4,70",
        "image": "https://tamanchocolates.com/wp-content/uploads/2023/03/837-tamna65-768x768.jpg",
        "cacao_percentage": "65%",
        "milk_percentage": "15%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Bijela čokolada s brusnicama i lješnjacima",
        "price": "3,75",
        "image": "https://hedona.hr/wp-content/uploads/2020/09/Cokolada-s-ambalazom-bijela-scaled.jpg",
        "cacao_percentage": "25%",
        "milk_percentage": "55%",
        "color": "bijela",
        "type_id": "",
        "producer_id": ""

    },
    {
        "name": "Bijela čokolada",
        "price": "1,70",
        "image": "https://hedona.hr/wp-content/uploads/2020/09/Cokolade-50g-bijela-760x507.jpg",
        "cacao_percentage": "25%",
        "milk_percentage": "45%",
        "color": "bijela",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Mliječna čokolada SRCE  s bademima",
        "price": "2,45",
        "image": "https://hedona.hr/wp-content/uploads/2020/09/Tamno-srce-scaled.jpg",
        "cacao_percentage": "45%",
        "milk_percentage": "35%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""

    },
    {
        "name": "HAKUNA MATATA - Tamna čokolada s crvenim paprom",
        "price": "4",
        "image": "https://hedona.hr/wp-content/uploads/2023/04/HM-zebra-760x507.jpg",
        "cacao_percentage": "70%",
        "milk_percentage": "10%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    }, 
    {
        "name": "Tamna čokolada s brusnicama i lješnjacima",
        "price": "3,75",
        "image": "https://hedona.hr/wp-content/uploads/2020/09/Cokolada-s-ambalazom-tamna-scaled.jpg",
        "cacao_percentage": "75%",
        "milk_percentage": "8%",
        "color": "crna",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Milka Strawberry",
        "price": "1,95",
        "image": "https://images-tastehub.mdlzapps.cloud/images/39b4e3d0-1576-47ee-9239-30ed6a13f0dd.png?fm=webp&q=80",
        "cacao_percentage": "45%",
        "milk_percentage": "45%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""

    },
    {
        "name": "Milka Oreo White",
        "price": "2,05",
        "image": "https://images-tastehub.mdlzapps.cloud/images/abd59275-47a5-4e24-9dbe-9d9ec921267e.png?fm=webp&q=80",
        "cacao_percentage": "30%",
        "milk_percentage": "55%",
        "color": "bijela",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Milka Triple Caramel",
        "price": "1,80",
        "image": "https://images-tastehub.mdlzapps.cloud/images/ad11495d-60ee-4c53-89ff-545bd1aafc28.png?fm=webp&q=80",
        "cacao_percentage": "40%",
        "milk_percentage": "45%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Milka Whole Hazelnuts",
        "price": "1,80",
        "image": "https://images-tastehub.mdlzapps.cloud/images/3d3ee88e-0470-406a-ae3f-ca401ceb3bf1.png?fm=webp&q=80",
        "cacao_percentage": "45%",
        "milk_percentage": "40%",
        "color": "smeda",
        "type_id": "",
        "producer_id": ""
    },
    {
        "name": "Milka Bubbly White",
        "price": "1,80",
        "image": "https://images-tastehub.mdlzapps.cloud/images/ae154e1c-1e94-4b9c-80d9-62f76b9c3c88.png?fm=webp&q=80",
        "cacao_percentage": "35%",
        "milk_percentage": "50%",
        "color": "bijela",
        "type_id": "",
        "producer_id": ""

    }
])