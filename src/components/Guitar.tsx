import type {Guitar} from '../types/index' // NG - 5.

type GuitarProps = { // NG - 4.
    guitar: Guitar,
    addToCart: (item: Guitar) => void
}

// export default function Guitar(props){ // NG - 1.
export default function Guitar({guitar, addToCart} : GuitarProps){ // NG - 2.

    const {name, image, description, price} = guitar


    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)} // NG - 3.
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- Los props son una forma de compartir informacion entre componentes. Se le puede pasar informacion de un componente padre a un componente hijo pero no al
 * reves; si por ejemplo se tiene un state que se va a pasar por multiples componentes, lo mejor es moverlo un nivel mas arriba de modo que se se convierta en un
 * padre para asi evitar errores. Estos props son similares a los atributos HTML pero tambien se les puede pasar arrays, funciones u objetos. La palabra reservada
 * "props" existe dentro de la sintaxis de react y existe alli bien sea que le pases o no informacion a los componentes.
 * 
 * 2.- Tambien se le puede aplicar destructuring al props. De esta forma nos evitamos tener que escribir por ejemplo: props.nombre dado que en este caso es un
 * objeto si no que llamamos directamente a la parte del objeto y nos evitamos tener que escribir la palabra props constantemente.
 * 
 * 3.- Esta es la forma de llamar a los eventos en React. Estos se definen antes de return y luego se situan en la parte del codigo donde deseemos llamarlos.
 * Ahora bien, en JavaScript al declarar el evento y le añadiamos los parentesis, queria decir que estabamos llamando inmediatamente ese evento. En React cuando
 * estos eventos toman parametros, al llamarlos en el return, es necesario hacerlo mediante un callback. De esta forma, detectara cuando se activa el evento y este
 * lo llamará. De lo contrario, se llamará inmediatamente sin esperar a que este suceda.
 * 
 * 4.- Podemos definir types que tomen valores de otros types. A su vez, a este podemos pasarle multiples datos y para llamarlo solo basta con los dos puntos
 * seguido de nombre del type.
 * 
 * 5.- Las importaciones de los types funcionan sin la necesidad de usar un import. React sabe que hay un type y lo vincula con el resto de archivos donde se 
 * necesite usar. Sin embargo, importarlo por la sintaxis conocida nos permite llamar a los types especificos que necesitemos usar. Igualmente, al emplear la
 * palabra reservada "type" luego del import, nos permite ser mas especificos ya que le decimos a React que lo que va a exportar es especificamente un type. Es
 * decir, se importa como un type definition.
 */