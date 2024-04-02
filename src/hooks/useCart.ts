import {useState, useEffect, useMemo} from 'react'
import { db } from '../data/db'
import { Guitar, GuitarItem } from '../types'

export const useCart = () => { // NG - 8.

    const initialCart = (): GuitarItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    // State
    const [data] = useState(db) // NG - 1 y 2.
    const [cart, setCart] = useState(initialCart)

    useEffect(() =>{ // NG - 3
        localStorage.setItem('cart', JSON.stringify(cart)) // NG - 5, 6 y 7.
    }, [cart])

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5


    function addToCart(item: Guitar){
        
        const itemExist = [...cart].findIndex(guitar => guitar.id === item.id)
        if(itemExist >= 0){ // Existe en el carrito
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else{
            const newItem: GuitarItem = {...item, quantity: 1}
            setCart([...cart, newItem]) // Resumiendo la sintaxis de la funcion. Esta se emplea en el script de Guitar.jsx
        }
    }


    function removeFromCart(id: Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }


    function decreaseQuantity(id: Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }

            return item
        })

        setCart(updateCart)
    }


    function increaseQuantity(id: Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
        })

        setCart(updateCart)
    }


    function clearCart(){
        setCart([])
    }


    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart]) // NG - 9 y 10.
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return{
        data,
        cart,
        initialCart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

/** NOTAS GENERALES

1.- Los Hooks son funciones que te permiten utilizar las diferentes funciones de React en tus componentes. Previo a ellos, se tenian que crear clases para
modificar el state, con los Hooks ya no es necesario. useState, useEffect y useContext son ejemplos de algunos Hooks.

2.- El State es una variable con informacion relevante en nuestra aplicacion de React. Este se compone de 3 partes: La primera es el State. Es decir, la variable
donde estará almacenada la informacion. La segunda es la funcion que va a modificar el state. Por convencion, si el state se llama modal, se recomienda que la
funcion se llame setModal (esto para especificar que es la funcion que modifica el state). Y por ultimo, el valor inicial. Este valor inicial es en el que queremos
que inicie nuestro state.

3.- useEffect siempre es un callbac, que dependiendo como se declare, realizará diferentes acciones. Al final de la sintaxis se abren y cierran unos corchetes,
a estos se les conoce como arreglo de dependencias. En dicho arreglo le podemos pasar una o mas dependencias al igual que states y estara escuchando por los
cambios que sucedan en estas. Una vez detecta un cambio, este se actualizara cuando eso suceda.

4.- La funcion asociada a un state siempre "sabe" cual es el estado de dicho state. No es necesario hacerle destructuring al state y a la funcion del App.jsx en caso
de exportarla a otro script para que esta sepa que esta modificando dado que dicha funcion solo puede modificar el state al cual está asociado. Ahora, como en este
caso estamos modificando un carrito de compras al corresponde el state de cart, la funcion setCart al tomar un parametro por default al que podemos nombrar como
nosotros queramos, inevitablemente va a modificar dicho state de cart; solo que por convencion, se le suelle añadir el prefijo "prev" para especificar que es el
estado previo al state. Luego ese mismo prevcart se le añade al carrito junto con un Spread Operator para que este haga una copia de lo que hay en el state de cart
y continue añadiendo los nuevos elementos al carrito.

5.- El state mas que ser sincrono, es asincrono. Esto significa que no se actualiza inmediatamente. Si fuese sincrono, tendria que esperar a que se ejecute todo el
codigo que tiene delante para poder actualizarse.

6.- La propiedad de sólo lectura localStorage es una API que permite acceder al objeto local Storage; y solo permite almacenar cadenas de texto (strings). Dicho
esto, localStorage es similar a sessionStorage. La única diferencia es que, mientras los datos almacenados en localStorage no tienen fecha de expiración, los
datos almacenados en sessionStorage son eliminados cuando finaliza la sesion de navegación lo cual ocurre cuando se cierra la página. Por su parte, .setItem() toma
dos valores. El primero es un identificador o key de lo que se desea almacenar y el segundo es el valor de ese key.

7.- El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON, opcionalmente reemplaza valores si se indica una función de
reemplazo, o si se especifican las propiedades mediante un array de reemplazo.

8.- React permite crear nuestros propios hooks. Esto permite hacer que nuestros hooks sean reutilizables, a la vez que nuestro codigo queda mas ordenado. Al hacer
nuestros hooks hay varias normas a seguir. La primera es que el archivo por convencion, se recomienda que tenga el mismo nombre del hooks y dado que estos deben
empezar con "use" seguido del nombre, de la misma forma debemos llamarlos. De esta forma, react sabe que es un hooks personalizado. Luego, los hooks se recomienda
que se realicen en archivos js o ts y no en archivos jsx o tsx. Esto debido a que solo van a ser archivos de logica y no van a estar involucrados con el template.
Finalmente, debemos pasar un return con la sintaxis de objeto (se recomienda que sea en objetos) y vamos sacando una a una las variables o funciones que
necesitemos.

9.- Un State derivado es una variable o funcion que dependa mucho de un determinado state.

10.- UseMemo es un hooks que evita que React renderice toda la pagina constantemente. En este sentido, toma dos valores. El primero es la funcion o condicion
que va a evaluar, y el segundo es el elemento por el cual esperara a que haya una modificacion para renderizar los cambios (este ultimo se pasa como arreglo).
En el caso actual, solo rendererizara cuando haya una modificacion en el carrito de compras (cart).
*/