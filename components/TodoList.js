app.component('todo-list', {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="todo-list">
            <div v-for="item in items" class="todo-item" :key="item.id">
                <div class="todo-item-display">
                    <input type="checkbox" :checked="item.checked" @click="terminateItem(item.id)" :id="item.id"/>
                    <label :for="item.id">{{item.title}}</label>
                </div>
                <div class="todo-item-action">
                    <button @click="removeItem(item.id)">Remove</button>
                </div>
            </div>
        </div>`,

    methods: {
        removeItem(id) {
            this.$emit('remove-item', id)
        },
        terminateItem(id) {
            this.$emit('terminate-item', id)
        }
    }
})