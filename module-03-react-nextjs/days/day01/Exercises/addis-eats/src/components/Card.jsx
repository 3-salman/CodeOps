

function Card(prom) {

    
  return (
    <div className="cards">
      <p>{prom.name}</p>
      <p>{prom.price}</p>
    </div>
  );
}

export default Card;