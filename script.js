document.addEventListener("DOMContentLoaded", function() {
    // Constante de datos de platos
    const menuItems = [
        { 
            name: "Pasta Carbonara", 
            ingredients: "Pasta, bacon, huevo, nata, queso parmesano", 
            price: "€15", 
            intolerance: "Contiene lactosa",
            image: "https://i.blogs.es/8819e1/carbonara-rec/650_1200.jpg",
            favorite: false
        },
        { 
            name: "Ensalada César", 
            ingredients: "Lechuga, pollo a la parrilla, crutones, queso parmesano, salsa César", 
            price: "€10", 
            intolerance: "Contiene gluten y lactosa",
            image: "https://www.goodnes.com/sites/g/files/jgfbjl321/files/srh_recipes/755f697272cbcdc6e5df2adb44b1b705.jpg",
            favorite: false
        },
        { 
            name: "Sushi Variado", 
            ingredients: "Arroz, salmón, aguacate, pepino, alga nori", 
            price: "€18", 
            intolerance: "Contiene gluten",
            image: "https://content-cocina.lecturas.com/medio/2018/07/19/sushi-variado-tradicional_91be2c41_800x800.jpg",
            favorite: false
        },
        { 
            name: "Curry de Verduras", 
            ingredients: "Verduras variadas, leche de coco, curry, arroz basmati", 
            price: "€14", 
            intolerance: "Apto para veganos y celíacos",
            image: "https://www.lasirena.es/img/p/4/2/7/8/1/42781.jpg",
            favorite: false
        },
        { 
            name: "Paella de Mariscos", 
            ingredients: "Arroz, camarones, mejillones, calamares, langostinos", 
            price: "€20", 
            intolerance: "No contiene alérgenos",
            image: "https://mojo.generalmills.com/api/public/content/_RBO1nvTxUe9m4o5nfEjag_gmi_hi_res_jpeg.jpeg?v=5e3706d8&t=16e3ce250f244648bef28c5949fb99ff",
            favorite: false
        },
        { 
            name: "Lasaña de Carne", 
            ingredients: "Carne molida, salsa de tomate, pasta, queso mozzarella", 
            price: "€16", 
            intolerance: "No contiene alérgenos",
            image: "https://cdn.colombia.com/gastronomia/2015/06/09/lasana-de-carne-y-queso-2977.jpg",
            favorite: false
        }
    ];

    // Elementos del DOM
    const menuContainer = document.getElementById("menu");
    const favoritesContainer = document.getElementById("favoritos-lista");
    const sinFavoritosMessage = document.getElementById("sin-favoritos");
    const filterDropdown = document.getElementById("filter-dropdown");
    const sortDropdown = document.getElementById("sort-dropdown");

    // Cargar la carta inicial
    renderMenuItems(menuItems);

    // Manejar los clics en los enlaces de navegación
    document.getElementById("carta").addEventListener("click", function(event) {
        event.preventDefault();
        renderMenuItems(menuItems);
        toggleVisibility(menuContainer, true);
        toggleVisibility(favoritesContainer, false);
    });

    document.getElementById("favoritos").addEventListener("click", function(event) {
        event.preventDefault();
        renderFavorites(menuItems);
        toggleVisibility(favoritesContainer, true);
        toggleVisibility(menuContainer, false);
    });

    // Event listener para el filtro
    filterDropdown.addEventListener("change", applyFilters);

    // Event listener para ordenar por precio
    sortDropdown.addEventListener("change", applySort);

    // Función para aplicar filtros
    function applyFilters() {
        const filterValue = filterDropdown.value;
        let filteredItems;
        if (filterValue === "todos") {
            filteredItems = menuItems;
        } else {
            filteredItems = menuItems.filter(item => item.intolerance.includes(filterValue));
        }
        renderMenuItems(filteredItems);
    }

    // Función para ordenar por precio
    function applySort() {
        const sortValue = sortDropdown.value;
        let sortedItems = [...menuItems];
        if (sortValue === "ascendente") {
            sortedItems.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
        } else {
            sortedItems.sort((a, b) => parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1)));
        }
        renderMenuItems(sortedItems);
    }

    // Función para renderizar los platos en la carta
    function renderMenuItems(items) {
        menuContainer.innerHTML = "";
        items.forEach(item => {
            const menuItem = createMenuItem(item);
            menuContainer.appendChild(menuItem);
        });
    }

    // Función para renderizar los favoritos en la sección correspondiente
    function renderFavorites(items) {
        const favorites = items.filter(item => item.favorite);
        favoritesContainer.innerHTML = "";
        if (favorites.length === 0) {
            sinFavoritosMessage.style.display = "block";
        } else {
            sinFavoritosMessage.style.display = "none";
            favorites.forEach(item => {
                const menuItem = createMenuItem(item);
                favoritesContainer.appendChild(menuItem);
            });
        }
    }

    // Función para crear un elemento de plato en la carta
    function createMenuItem(item) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("plato-menu");
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>Ingredientes: ${item.ingredients}</p>
            <p>Precio: ${item.price}</p>
            <p>Intolerancia: ${item.intolerance}</p>
            <button data-name="${item.name}" class="favorite-button">${item.favorite ? "Quitar de favoritos" : "Agregar a favoritos"}</button>
        `;
        const favoriteButton = menuItem.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', toggleFavorite);
        return menuItem;
    }

    // Función para cambiar el estado de favorito de un plato
    function toggleFavorite(event) {
        const name = event.target.dataset.name;
        const item = menuItems.find(item => item.name === name);
        item.favorite = !item.favorite;
        renderMenuItems(menuItems);
        renderFavorites(menuItems);
    }

    // Función para cambiar la visibilidad de un elemento
    function toggleVisibility(element, visible) {
        element.style.display = visible ? "block" : "none";
    }
});
