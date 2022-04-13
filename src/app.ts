class MyClass {
    myMethod() {
        const foo = 123;
        const that = this;
        console.log(1, this);
        setTimeout(function() {
            console.log(that);
        }, 0);
        setTimeout(() => {
            console.log(this);
        }, 0);
    }
}

const myInstance = new MyClass();
myInstance.myMethod();

const element = document.querySelector('.click');

function handleClick(this: HTMLAnchorElement, event: Event) {
    event.preventDefault()
    console.log(this.href)
}

element?.addEventListener('click', handleClick, false);


// TYPEOF:
// const person = {
//     name: 'Ati',
//     age: 33
// };

// type Person = typeof person;
// // javascript typeof just would give us object
// type PersonKeys = keyof Person;

// type PersonTypes = Person[PersonKeys];

// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//     return obj[key];
// }

// const personName = getProperty<Person, PersonKeys>(person, 'name');
// console.log(personName);

// const personTwo: Person = {
//     name: 'John',
//     age: 40
// };

// READONLY MAPPED TYPES:
// interface Person {
//     name: string,
//     age: number
// };

// interface ReadonlyPerson {
//     readonly name: string,
//     readonly age: number
// };

// const person: Person = {
//     name: 'Ati',
//     age: 33
// };

// function freeze<T>(object: T): Readonly<T> {
//     return Object.freeze(object);
    
// }

// const newPerson = freeze<Person>(person);
// console.log(newPerson)

// PARTIAL MAPPED TYPES:
// interface Person {
//     name: string,
//     age: number
// };

// type PartialType<T> = {
//     [P in keyof T]?: T[P]
// }

// function updatePerson(person: Person, prop: PartialType<Person>) {
//     return { ...person, ...prop };
// }

// const person: Person = {
//     name: 'Ati',
//     age: 33
// };

// const p2 = updatePerson(person, {age: 34});

// console.log(p2);

// REQUIRED MAPPED TYPES:
// interface Person {
//     name: string,
//     age?: number
// };

// // type RequiredType<T> = {
// //     [P in keyof T]-?: T[P]
// //     // we are removing the ? mark meaning it won't be optional
// // }

// const person: Required<Person> = {
//     name: 'Ati',
//     age: 33
// };

// function printage(person: Required<Person>) {
//     return `${person.name} is ${person.age} years old`;
// }


// console.log(printage(person));


// PICK MAPPED TYPES:
// interface Person {
//     name: string,
//     age: number,
//     address: {}
// };

// type PickType<T, K extends keyof T> = {
//     [P in K]: T[P]
// }

// const person: Pick<Person, 'name' | 'age'> = {
//     name: 'Ati',
//     age: 33
// };


// RECORD MAPPED TYPE:
// let dictionary: { [key: string]: any } = {}
// let dictionary: Record<string, TrackStates> = {}

// interface TrackStates {
//     current: string,
//     next: string
// }

// const item: Record<keyof TrackStates, string> = {
//     current: 'dffdasfasdfw3reqerq',
//     next: 'sidyfiausdyfaiuysf'
// };

// // numbers are coerced to string
// dictionary[0] = item;


// TYPEOF TYPE GUARD:

function foo(bar: string | number) {
    if (typeof bar === 'string') {
        return bar.toUpperCase();
    }
    return bar.toFixed(2)
}

class Song {
    constructor(public title: string, public duration: string | number) {}
}

function getSongDuration(item: Song) {
    if(typeof item.duration === 'string') {
        return item.duration;
    }
    const { duration } = item;
    const minutes = Math.floor(duration / 60000);
    const seconds = (duration / 1000) % 60;
    return `${minutes}:${seconds}`;
}

const songDurationFromString = getSongDuration(
    new Song('Wonderful life', '05:31')
)
// console.log(songDurationFromString);

const songDurationFromMs = getSongDuration(
    new Song('Wonderful life', 330000)
)
// console.log(songDurationFromMs);



// INSTANCEOF TYPEGUARD:
class Foo {
    bar() {}
}

const bar = new Foo();
// console.log(bar instanceof Foo);
// console.log(Object.getPrototypeOf(bar) === Foo.prototype);

class Song2 {
    constructor(public title: string, public duration: number) {}
}

class Playlist {
    constructor(public name: string, public songs: Song2[]) {}
}

function getItemName(item: Song2 | Playlist) {
    if (item instanceof Song2) {
        return item.title;
    }
    return item.name;
}

const songName = getItemName(new Song2('Wonderful life', 330000));
// console.log('Song name:', songName);

const playlistName = getItemName(new Playlist('chillout', [new Song2('Wonderful life', 330000)]));
// console.log('Playlist name:', playlistName);