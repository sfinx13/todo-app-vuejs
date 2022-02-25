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
                    <label contenteditable="false"  @keyup.enter="updateItem(item.id)">{{item.title}}</label>
                </div>
                <div class="todo-item-action">
                    <button @click="updateItem(item.id)">
                        <img src="./assets/images/edit-icon.svg" width="24">
                    </button>
                    <button class="remove-button" @click="removeItem(item.id)">
                        <img src="./assets/images/trash-icon.svg" width="24">
                    </button>
                </div>
            </div>
        </div>`,

    methods: {
        updateItem(id) {
            const label = this.$refs.items[id - 1].querySelector("label")
            const button = this.$refs.items[id - 1].querySelector(".todo-item-action button")
            const img = this.$refs.items[id - 1].querySelector(".todo-item-action img")
            if ('false' == label.contentEditable) {
                label.contentEditable = 'true';
                label.focus();
                label.style.borderBottom = "2px solid blue";
                button.classList.add('edit-button')
                img.src = './assets/images/check-icon.svg';
            } else {
                label.contentEditable = 'false';
                label.style.borderBottom = "0 solid blue";
                button.classList.remove('edit-button')
                img.src = './assets/images/edit-icon.svg';
                this.$emit("update-item", id, label.textContent);
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
