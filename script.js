document.addEventListener('DOMContentLoaded', function() {
    let userScore = 0;
    let userCollection = [];

    function updateScore() {
        document.querySelector('#userScore').textContent = userScore;
    }

    function completeTask(taskItem) {
        const completedList = document.querySelector('#completedList');
        taskItem.querySelector('button').remove();
        completedList.appendChild(taskItem);
        userScore += 10;
        updateScore();
    }

    function createTaskItem(taskText, dayOfWeek) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText + ' (' + dayOfWeek + ')';
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Compleated';
        completeButton.addEventListener('click', function() {
            completeTask(taskItem);
        });
        taskItem.appendChild(completeButton);
        return taskItem;
    }

    const taskForm = document.querySelector('#planner form');
    const taskList = document.querySelector('#taskList');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#task');
        const taskText = taskInput.value;
        const dayOfWeek = document.querySelector('#dayOfWeek').value;

        if (taskText.trim() !== '') {
            const taskItem = createTaskItem(taskText, dayOfWeek);
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    });

   
    const storeItems = [
        { name: 'Legendary Book', cost: 50 },
        { name: 'Mythical invisible pen', cost: 100 },
        { name: 'Common sizers', cost: 20 }
    ];

    const storeList = document.querySelector('#storeItems');
    const collectionList = document.querySelector('#collectionItems');

    function updateStore() {
        storeList.innerHTML = '';
        storeItems.forEach(function(item, index) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.cost} score`;
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy';
            buyButton.addEventListener('click', function() {
                buyItem(index);
            });
            listItem.appendChild(buyButton);
            storeList.appendChild(listItem);
        });
    }

    function updateCollection() {
        collectionList.innerHTML = '';
        userCollection.forEach(function(item) {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            collectionList.appendChild(listItem);
        });
    }

    function buyItem(index) {
        const item = storeItems[index];
        if (userScore >= item.cost) {
            userScore -= item.cost;
            userCollection.push(item.name);
            updateScore();
            updateCollection();
        } else {
            alert('You dont have enough score points');
        }
    }

    const buyItemButton = document.querySelector('#buyItem');
    buyItemButton.addEventListener('click', function() {
        updateStore();
    });
});