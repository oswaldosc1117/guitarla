import Header from "./components/Header"
import Guitar from "./components/Guitar"
import {useCart} from './hooks/useCart'

function App() {

    const {data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart() // NG - 8.

    
    return (
        <> {/* NG - 1. */}
            <Header // NG - 2.
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            isEmpty={isEmpty} // NG - 9.
            cartTotal={cartTotal} // NG - 9.
            /> 
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => ( // NG - 3, 4 y 5.
                        <Guitar
                            key={guitar.id} // NG - 7.
                            guitar={guitar} // NG - 6.
                            addToCart={addToCart}
                            // setCart={setCart} // Llamando a la funcion del state cart.
                        />
                    ))}
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App


/** NOTAS GENERALES

1.- Por regla de los componentes, solo puede existir un solo nivel de elementos en el nivel superior. Es decir, no puedo tener dos divs en el mismo nivel, tendrian
que estar uno debajo de el otro para asi definir uno que esta en un nivel maximo, y luego sigue el siguiente div. Para evitar esto, se emplean los fragments que 
actuan como etiquetas HTML y hay varias formas de emplearlos. Sin embargo, las mas empleada es en la cual solo se usan los signos de <> para abrir y luego </> para
cerrar. De esta forma, el fragment se define como el nivel superior o se soluciona ese problema. Si nos encontramos dentro de uno de los componentes donde solo
quisieramos exportar el header por ejemplo, este fragment no es necesario dado que el header seria el nivel maximo.

2.- Los componentes permiten separar la interfaz de usuario en piezas independientes, reutilizables y pensar en cada pieza de forma aislada. Para ello, movemos
la parte de nuestro codigo que deseamos separar a otro archivo bien sea .jsx (para JavaScript en React) o .tsx (para TypeScript en React), creamos una funcion e
introducimos el codigo. Se le agrega un export default dado que solo puede haber uno por archivo y solo movemos una pieza de codigo por componente y luego lo
importamos al App.jsx que es nuestro archivo principal. Las principales caracteristicas de los componentes es que permiten separar tu codigo en uno o multiples
componentes y que vuelve tu codigo reutilizable.

3.- Un Statment es una instruccion para realizar determinada accion, cada proyecto que realizamos se basa en instrucciones. Algunos de los statements de los mas
comunes en JavaScript son la creacion de variables, condicionales con if, interadores con while o for y lanzar errores con throw New Error().

4.- Las Expressions es una expresion que produce un valor nuevo. Un ejemplo de esto son los ternarios que te devuelven un true o false, utilizar un Array Method
que genera un nuevo Array y .map que genera un nuevo arreglo a diferencia de un forEach.

5.- La diferencia entre un statement y un expression en cuanto a su utilizacion en React es que los statements no podemos utilizarlos dentro de un return. Mientras
que las expressions si podemos utilizarlas dentro de los returns.

6.- De esta forma se pasan los props. Como bien se observa, tienen una sintaxis muy similar a los atributos de HTML. En este caso, se le pasa el objeto de guitar
en el .map y se define el nombre del props con el mismo termino. Esto se recomienda para asi evitar confusiones con multiples nombres.

7.- Siempre que iteremos utilizando un .map(), es necesario pasar un key o indentificador unico. Ese props siempre va a tener el nombre de "key" y su valor debe ser
unico. Es decir, no puede repetirse. En este caso, le pasamos el id del objeto guitar dado que siempre va a ser unico por cada objeto de guitar.

8.- Para importar nuestros hooks, se emplea como un destructuring con la diferencia que al final mandamos a llamar a la funcion que corresponde a nuestro hook como
se muestra arriba.

9.- Anteriormente las variables isEmpty y cartTotal se encontraban en el componente de Header.jsx. Sin embargo, estas fueron movidas a nuestro propio hooks. En este
caso, extraemos las variables con un destructuring al igual que las demas y las pasamos como props y luego las importamos en el Header. Ahora bien, por que no
hacemos lo mismo que hicimos en el App.jsx en el Header.jsx? es decir, importar nuestro hook unicamente con las variables o funciones que necesitamos. Esto no se
hace debido a que estariamos creando dos instancias diferentes de nuestro hooks y ninguna de estas instancias sabe de la existencia de la otra. Esto genera
problema debido a que puede causar errores en nuestro codigo porque React trata de interpretar ambos. Por eso, se recomienda pasar nuestro hook una sola vez e
importarlo a otros archivos donde lo necesitemos via props.
*/
