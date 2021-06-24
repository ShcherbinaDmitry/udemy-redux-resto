export default class RestoService {
    constructor() {
        this._apiBase = 'http://localhost:3001';
    }

    getResource = async (url) => {
        const result = await fetch(`${this._apiBase}${url}`);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${result.status}`);
        }

        return await result.json();
    }

    getMenuItems = async () => {
        const result = await this.getResource('/menu/');
        return result;
    }

    getItem = async (id) => {
        const result = await this.getResource('/menu/');
        const item = result.find( (el) => {
            console.log(`el.id: ${el.id}, id: ${id}`);
            return el.id === +id;
        })

        return item;
    }

    async setOrder(order) {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order: order
        }
        const response = await fetch(`${this._apiBase}/orders`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    }

    async getOrderNumber(){
        const res = await this.getResource('/orders/');
        const orderNumber = res.length+1;

        return orderNumber
    }
}