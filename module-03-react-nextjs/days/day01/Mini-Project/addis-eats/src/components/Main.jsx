
import Card from './Card';



const menu = [
{ id: 1, name: "Doro Wat", price: 240 },
{ id: 2, name: "Shiro", price: 120 },
{ id: 3, name: "Tibs", price: 280 },
{ id: 1, name: "Doro Wat", price: 240 },
{ id: 2, name: "Shiro", price: 120 },
{ id: 3, name: "Tibs", price: 280 },
{ id: 1, name: "Doro Wat", price: 240 },
{ id: 2, name: "Shiro", price: 120 },
{ id: 3, name: "Tibs", price: 280 },
{ id: 1, name: "Doro Wat", price: 240 },
{ id: 2, name: "Shiro", price: 120 },
{ id: 3, name: "Tibs", price: 280 },
];

function Main() {
    return (
        <div className="main-style">
            <p>hello React.this is my firsr time using React</p>
            <h1>Welcome to Addis Eats</h1>
            <p>Discover the best food in Addis Ababa!</p>
            <div className="cards-container">

                {menu.map((item ) =>{
                    return <Card key={item.id} name={item.name} price={item.price} />
                })}

            
            </div>
        </div>
    );
}

export default Main;