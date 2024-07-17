document.addEventListener('DOMContentLoaded', () => {
    // Simulated user database
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const saveUsers = () => localStorage.setItem('users', JSON.stringify(users));
    const saveCurrentUser = () => localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                currentUser = user;
                saveCurrentUser();
                window.location.href = 'search.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Handle Signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const user = { name, email, password, lists: [] };
            users.push(user);
            saveUsers();
            alert('Signup successful. Please log in.');
            window.location.href = 'login.html';
        });
    }

    // Handle Search and Filter
    const filterInput = document.getElementById('filterInput');
    const searchButton = document.getElementById('searchButton');
    const imagesContainer = document.getElementById('imagesContainer');
    const saveListButton = document.getElementById('saveListButton');

    const dogImages = [
        { code: 100, url: 'https://http.dog/100.jpg' },
        { code: 101, url: 'https://http.dog/101.jpg' },
        { code: 102, url: 'https://http.dog/102.jpg' },
        { code: 200, url: 'https://http.dog/200.jpg' },
        { code: 201, url: 'https://http.dog/201.jpg' },
        { code: 202, url: 'https://http.dog/202.jpg' },
        { code: 203, url: 'https://http.dog/203.jpg' },
        { code: 204, url: 'https://http.dog/204.jpg' },
        { code: 205, url: 'https://http.dog/205.jpg' },
        { code: 206, url: 'https://http.dog/206.jpg' },
        { code: 207, url: 'https://http.dog/207.jpg' },
        { code: 208, url: 'https://http.dog/208.jpg' },
        { code: 226, url: 'https://http.dog/226.jpg' },
        { code: 300, url: 'https://http.dog/300.jpg' },
        { code: 301, url: 'https://http.dog/301.jpg' },
        { code: 302, url: 'https://http.dog/302.jpg' },
        { code: 303, url: 'https://http.dog/303.jpg' },
        { code: 304, url: 'https://http.dog/304.jpg' },
        { code: 305, url: 'https://http.dog/305.jpg' },
        { code: 307, url: 'https://http.dog/307.jpg' },
        { code: 308, url: 'https://http.dog/308.jpg' },
        { code: 400, url: 'https://http.dog/400.jpg' },
        { code: 401, url: 'https://http.dog/401.jpg' },
        { code: 402, url: 'https://http.dog/402.jpg' },
        { code: 403, url: 'https://http.dog/403.jpg' },
        { code: 404, url: 'https://http.dog/404.jpg' },
        { code: 405, url: 'https://http.dog/405.jpg' },
        { code: 406, url: 'https://http.dog/406.jpg' },
        { code: 407, url: 'https://http.dog/407.jpg' },
        { code: 408, url: 'https://http.dog/408.jpg' },
        { code: 409, url: 'https://http.dog/409.jpg' },
        { code: 410, url: 'https://http.dog/410.jpg' },
        { code: 411, url: 'https://http.dog/411.jpg' },
        { code: 412, url: 'https://http.dog/412.jpg' },
        { code: 413, url: 'https://http.dog/413.jpg' },
        { code: 414, url: 'https://http.dog/414.jpg' },
        { code: 415, url: 'https://http.dog/415.jpg' },
        { code: 416, url: 'https://http.dog/416.jpg' },
        { code: 417, url: 'https://http.dog/417.jpg' },
        { code: 418, url: 'https://http.dog/418.jpg' },
        { code: 421, url: 'https://http.dog/421.jpg' },
        { code: 422, url: 'https://http.dog/422.jpg' },
        { code: 423, url: 'https://http.dog/423.jpg' },
        { code: 424, url: 'https://http.dog/424.jpg' },
        { code: 425, url:'https://http.dog/425.jpg' },
        { code: 426, url: 'https://http.dog/426.jpg' },
        { code: 428, url: 'https://http.dog/428.jpg' },
        { code: 429, url: 'https://http.dog/429.jpg' },
        { code: 431, url: 'https://http.dog/431.jpg' },
        { code: 451, url: 'https://http.dog/451.jpg' },
        { code: 500, url: 'https://http.dog/500.jpg' },
        { code: 501, url: 'https://http.dog/501.jpg' },
        { code: 502, url: 'https://http.dog/502.jpg' },
        { code: 503, url: 'https://http.dog/503.jpg' },
        { code: 504, url: 'https://http.dog/504.jpg' },
        { code: 505, url: 'https://http.dog/505.jpg' },
        { code: 506, url: 'https://http.dog/506.jpg' },
        { code: 507, url: 'https://http.dog/507.jpg' },
        { code: 508, url: 'https://http.dog/508.jpg' },
        { code: 510, url: 'https://http.dog/510.jpg' },
        { code: 511, url: 'https://http.dog/511.jpg' },
        { code: 520, url: 'https://http.dog/520.jpg' },
        { code: 521, url: 'https://http.dog/521.jpg' },
        { code: 522, url: 'https://http.dog/522.jpg' },
        { code: 523, url: 'https://http.dog/523.jpg' },
        { code: 524, url: 'https://http.dog/524.jpg' },
        { code: 525, url: 'https://http.dog/525.jpg' },
        { code: 526, url: 'https://http.dog/526.jpg' },
        { code: 527, url: 'https://http.dog/527.jpg' },
        { code: 528, url: 'https://http.dog/528.jpg' },
        { code: 529, url: 'https://http.dog/529.jpg' },
        { code: 530, url: 'https://http.dog/530.jpg' },
        { code: 531, url: 'https://http.dog/531.jpg' },
        { code: 532, url: 'https://http.dog/532.jpg' },
        { code: 533, url: 'https://http.dog/533.jpg' },
        { code: 534, url: 'https://http.dog/534.jpg' },
        { code: 535, url: 'https://http.dog/535.jpg' },
        { code: 536, url: 'https://http.dog/536.jpg' },
        { code: 537, url: 'https://http.dog/537.jpg' },
        { code: 538, url: 'https://http.dog/538.jpg' },
        { code: 539, url: 'https://http.dog/539.jpg' },
        { code: 540, url: 'https://http.dog/540.jpg' },
        { code: 541, url: 'https://http.dog/541.jpg' },
        { code: 542, url: 'https://http.dog/542.jpg' },
        { code: 543, url: 'https://http.dog/543.jpg' },
        { code: 544, url: 'https://http.dog/544.jpg' },
        { code: 545, url: 'https://http.dog/545.jpg' },
        { code: 546, url: 'https://http.dog/546.jpg' },
        { code: 547, url: 'https://http.dog/547.jpg' },
        { code: 548, url: 'https://http.dog/548.jpg' },
        { code: 549, url: 'https://http.dog/549.jpg' },
        { code: 550, url: 'https://http.dog/550.jpg' },
        { code: 551, url: 'https://http.dog/551.jpg' },
        { code: 552, url: 'https://http.dog/552.jpg' },
        { code: 553, url: 'https://http.dog/553.jpg' },
        { code: 554, url: 'https://http.dog/554.jpg' },
        { code: 555, url: 'https://http.dog/555.jpg' },
        { code: 556, url: 'https://http.dog/556.jpg' },
        { code: 557, url: 'https://http.dog/557.jpg' },
        { code: 558, url: 'https://http.dog/558.jpg' },
        { code: 559, url: 'https://http.dog/559.jpg' },
        { code: 560, url: 'https://http.dog/560.jpg' },
        { code: 561, url: 'https://http.dog/561.jpg' },
        { code: 562, url: 'https://http.dog/562.jpg' },
        { code: 563, url: 'https://http.dog/563.jpg' },
        { code: 564, url: 'https://http.dog/564.jpg' },
        { code: 565, url: 'https://http.dog/565.jpg' },
        { code: 566, url: 'https://http.dog/566.jpg' },
        { code: 567, url: 'https://http.dog/567.jpg' },
        { code: 568, url: 'https://http.dog/568.jpg' },
        { code: 569, url: 'https://http.dog/569.jpg' },
        { code: 570, url: 'https://http.dog/570.jpg' },
        { code: 571, url: 'https://http.dog/571.jpg' },
        { code: 572, url: 'https://http.dog/572.jpg' },
        { code: 573, url: 'https://http.dog/573.jpg' },
        { code: 574, url: 'https://http.dog/574.jpg' },
        { code: 575, url: 'https://http.dog/575.jpg' },
        { code: 576, url: 'https://http.dog/576.jpg' },
        { code: 577, url: 'https://http.dog/577.jpg' },
        { code: 578, url: 'https://http.dog/578.jpg' },
        { code: 579, url: 'https://http.dog/579.jpg' },
        { code: 580, url: 'https://http.dog/580.jpg' },
        { code: 581, url: 'https://http.dog/581.jpg' },
        { code: 582, url: 'https://http.dog/582.jpg' },
        { code: 583, url: 'https://http.dog/583.jpg' },
        { code: 584, url: 'https://http.dog/584.jpg' },
        { code: 585, url: 'https://http.dog/585.jpg' },
        { code: 586, url: 'https://http.dog/586.jpg' },
        { code: 587, url: 'https://http.dog/587.jpg' },
        { code: 588, url: 'https://http.dog/588.jpg' },
        { code: 589, url: 'https://http.dog/589.jpg' },
        { code: 590, url: 'https://http.dog/590.jpg' },
        { code: 591, url: 'https://http.dog/591.jpg' },
        { code: 592, url: 'https://http.dog/592.jpg' },
        { code: 593, url: 'https://http.dog/593.jpg' },
        { code: 594, url: 'https://http.dog/594.jpg' },
        { code: 595, url: 'https://http.dog/595.jpg' },
        { code: 596, url: 'https://http.dog/596.jpg' },
        { code: 597, url: 'https://http.dog/597.jpg' },
        { code: 598, url: 'https://http.dog/598.jpg' },
        { code: 599, url: 'https://http.dog/599.jpg' },
        { code: 999, url: 'https://http.dog/999.jpg' }
        // Add more response codes and URLs as needed
    ];




    const displayImages = (query) => {
        imagesContainer.innerHTML = '';
        const regex = new RegExp(`^${query.replace(/x/g, '\\d')}$`);
        const filteredImages = dogImages.filter(img => regex.test(img.code.toString()));
        filteredImages.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.url;
            imagesContainer.appendChild(imgElement);
        });
    };

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = filterInput.value;
            displayImages(query);
        });
    }

    if (saveListButton) {
        saveListButton.addEventListener('click', () => {
            const query = filterInput.value;
            const regex = new RegExp(`^${query.replace(/x/g, '\\d')}$`);
            const filteredImages = dogImages.filter(img => regex.test(img.code.toString()));
            const listName = prompt('Enter a name for the list:');
            const creationDate = new Date().toISOString();
            const list = {
                name: listName,
                creationDate,
                codes: filteredImages.map(img => img.code),
                images: filteredImages.map(img => img.url)
            };
            currentUser.lists.push(list);
            saveUsers();
            saveCurrentUser();
            alert('List saved successfully.');
        });
    }

    const showSaveListButton = document.getElementById('showSaveListButton');
    if (showSaveListButton) {
        showSaveListButton.addEventListener('click', () => {
            window.location.href = 'lists.html';
        });
    }
    // Handle Lists Page
    const listsContainer = document.getElementById('listsContainer');
    if (listsContainer) {
        const renderLists = () => {
            listsContainer.innerHTML = '';
            currentUser.lists.forEach((list, index) => {
                const listItem = document.createElement('div');
                listItem.className = 'list-item';
                listItem.innerHTML = `
                    <span>${list.name}</span>
                    <button onclick="viewList(${index})">View</button>
                    <button onclick="editList(${index})">Edit</button>
                    <button onclick="deleteList(${index})">Delete</button>
                `;
                listsContainer.appendChild(listItem);
            });
        };

        renderLists();

        window.viewList = (index) => {
            const list = currentUser.lists[index];
            alert(`Response Codes: ${list.codes.join(', ')}`);
        };

        window.editList = (index) => {
            const list = currentUser.lists[index];
            const newName = prompt('Enter a new name for the list:', list.name);
            if (newName) {
                list.name = newName;
                saveUsers();
                saveCurrentUser();
                renderLists();
            }
        };

        window.deleteList = (index) => {
            if (confirm('Are you sure you want to delete this list?')) {
                currentUser.lists.splice(index, 1);
                saveUsers();
                saveCurrentUser();
                renderLists();
            }
        };
    }
});
