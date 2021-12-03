app.component("todo-form", {
    template: `
        <div class="form-group">
            <input type="text" placeholder="Add your new todo" class="form-control" v-model="item" @keyup.enter="addItem"/>
            <input type="button" value="Add"
            class="form-control"
            @click="addItem"
            :disabled="item === ''" 
            :class=" { disabledButton:  item === ''}"/>
            <div class="form-invalid">
                {{error}}
            </div>
        </div>
        <todo-info :details="details"></todo-info>
        <todo-list :items="items" @remove-item="removeItem" @terminate-item="terminateItem"></todo-list>`,
    data() {
        return {
            items: [],
            item: '',
            details: { total: 0, done: 0 },
            error: ''
        }
    },
    methods: {
        addItem() {
            if (this.item.length === 0) {
                this.error = "Please add a task"
                setTimeout(() =>  this.error = '', 3000)
                return;
            }
            this.items.push({id: this.items.length + 1, title: this.item, checked: false})
            this.item = ''
            this.details.total = this.items.length
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id )
            this.details.total = this.items.length
            this.details.done = this.details.done > this.details.total ? this.details.total : this.details.done
        },
        terminateItem(id) {
             const index = this.items.findIndex( item => item.id === id)
             this.items[index].checked = !this.items[index].checked ? true : false;
             this.details.done = this.items.reduce((acc, item) => acc + item.checked, 0)
        },
    }
});
