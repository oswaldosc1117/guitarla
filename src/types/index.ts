export type Guitar = { // NG- 1.
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

// Heredar y extender un type

    export type GuitarItem = Guitar & { // NG - 2.
        quantity: number
    }

    // export interface GuitarItem extends Guitar { // NG - 3.
    //     quantity: number
    // }


// interface ejemplo { // NG- 1.
//     id: number,
//     name: string,
//     image: string,
//     description: string,
//     price: number,
// }


// Utility types

    // TypeScript proporciona varias utilidades de types para facilitar las transformaciones de types comunes. Estas utilidades están disponibles globalmente.
    
    // Pick<Type, Keys>

        // Construye un nuevo type a base de seleccionar las propiedades de un type padre mediante llaves (pasadas como strings).

            // export type GuitarItem = Pick <Guitar, 'id' | 'name' | 'price'> & {
            //     quantity: number
            // }

    // Omit<Type, Keys>

        // Construye un nuevo type a base de remover las propiedades seleccionadas de un type padre mediante llaves (pasadas como strings).

            // export type GuitarItem = Omit <Guitar, 'id' | 'name' | 'price'> & {
            //     quantity: number
            // }


/** NOTAS GENERALES
 * 
 * 1.- types e interface: Se emplean para definir los tipos de datos que va a tomar un arreglo o un objeto. Se emplea la palabra reservada type o interface y se
 * pasa como si fuese un objeto. Luego, para mandarlo a llamar, se le añaden los dos puntos a la variable seguido del nombre del type o interface. En el caso de
 * arriba, a este se le añade unas llaves para especificar que el type va a un arreglo y se replicara en cada una de las posiciones del mismo. Ambos cumplen
 * practicamente la misma funcion. Por convencion, al declararlos se sugiere que la 1era letra sea en mayusculas.
 * 
 * 2.- Sintaxis para heredar los elementos de un type padre o interface padre y poder añadirle otros en un nuevo type.
 * 
 * 3.- Sintaxis para heredar los elementos de un type padre o interface padre y poder añadirle otros en un nuevo interface.
*/