app.component("todo-list", {
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    template: `
        <div class="todo-list">
            <div v-for="item in items" class="todo-item" :key="item.id" ref="items">
                <div class="todo-item-display">
                    <input type="checkbox" :checked="item.checked" @click="terminateItem(item.id)" :id="item.id"/>
                    <label
                        :contenteditable="item.editable" 
                        :class="{ editable: item.editable }"  
                        @keyup.enter="updateItem(item.id, $event)">{{ item.title }}</label>
                </div>
                <div class="todo-item-action">
                    <button @click="updateItem(item.id, $event)" :style="{ background: item.color }">
                        <img :src="'./assets/images/' + item.icon" width="24">
                    </button>
                    <button class="remove-button" @click="removeItem(item.id)">
                        <img src="./assets/images/trash-icon.svg" width="24">
                    </button>
                </div>
            </div>
        </div>`,

    methods: {
        updateItem(id, event) {
            event.preventDefault()
            const currentElement = event.target
            const index = this.items.findIndex((item) => item.id === id)
            console.log(`click ${index}`)
            let label
            if (currentElement.tagName === 'IMG') {
                label = currentElement.parentElement.parentElement.previousElementSibling.querySelector('label')
            } else if (currentElement.tagName === 'BUTTON') {
                label = currentElement.parentElement.previousElementSibling.querySelector('label')
            } else {
                label = currentElement
            }
            if (!this.items[index].editable) {
                this.items[index].editable = true
                this.items[index].icon = 'check-icon.svg'
                this.items[index].color = 'green'
            } else {
                this.items[index].editable = false;
                this.items[index].icon = 'edit-icon.svg'
                this.items[index].color = '#0d47a1'
                this.items[index].title = label.textContent
            }
        },
        removeItem(id) {
            this.$emit("remove-item", id);
        },
        terminateItem(id) {
            this.$emit("terminate-item", id);
        },
    },
});
