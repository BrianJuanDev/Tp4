class Votante {
    nombre: string;
    dni: number;

    constructor(nombre: string, dni: number) {
        this.nombre = nombre;
        this.dni = dni;
    }
}

class Candidato {
    nombre: string;
    partido: PartidoPolitico;

    constructor(nombre: string, partido: PartidoPolitico) {
        this.nombre = nombre;
        this.partido = partido;
    }
}

class PartidoPolitico {
    nombre: string;
    candidatos: Candidato[];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.candidatos = [];
    }

    agregarCandidato(candidato: Candidato): void {
        this.candidatos.push(candidato);
    }
}

class Voto {
    votante: Votante;
    candidato?: Candidato | null;
    esBlanco: boolean;

    constructor(votante: Votante, candidato: Candidato | null = null, esBlanco: boolean = false) {
        this.votante = votante;
        this.candidato = candidato;
        this.esBlanco = esBlanco;
    }
}

class ListaElectoral {
    candidatos: Candidato[];

    constructor() {
        this.candidatos = [];
    }

    agregarCandidato(candidato: Candidato): void {
        this.candidatos.push(candidato);
    }
}

class SistemaVotoElectronico {
    partidoPolitico: PartidoPolitico[];
    votantes: Votante[];
    votos: Voto[]

    constructor() {
        this.partidoPolitico = [];
        this.votantes = [];
        this.votos = [];
    }

    agregarPartidoPolitico(nombre: string): void {
        const partido = new PartidoPolitico(nombre);
        this.partidoPolitico.push(partido);
    }

    agregarCandidatoAPartido(candidato: Candidato, partidoNombre: string): void {
        const partido = this.partidoPolitico.find((partido)=> partido.nombre === partidoNombre)

        if(partido) {
            partido.agregarCandidato(candidato);    
        } else {       
            console.log(`El partido político ${partidoNombre} no existe.`);
        }
    }

    agregarListaElectoral(lista: ListaElectoral): void {
        lista.candidatos.forEach((candidato) => {
            this.agregarCandidatoAPartido(candidato, candidato.partido.nombre);
        });
    }

    agregarVotante(votante: Votante): void {
        this.votantes.push(votante);
    }

    realizarVoto(votante: Votante, candidato?: Candidato): void {
        if (candidato === undefined) {
            const votoBlanco = new Voto(votante, null, true);
            this.votos.push(votoBlanco);
        } else {
            const voto = new Voto(votante, candidato);
            this.votos.push(voto);
        }
    }
      

    obtenerResultados(): void {
        console.log("Resultados de la elección:");
        this.partidoPolitico.forEach((partido) => {
            console.log(`${partido.nombre}:`);
            let votosNormales = 0;
            let votosEnBlanco = 0;
            partido.candidatos.forEach((candidato) => {
                const votosCandidato = this.votos.filter((voto) => voto.candidato === candidato).length;
                votosNormales += votosCandidato;
            });
    
            votosEnBlanco = this.votos.filter((voto) => voto.candidato === null && voto.esBlanco).length;
    
            console.log(`Votos en blanco: ${votosEnBlanco}`);
            partido.candidatos.forEach((candidato) => {
                const votosCandidato = this.votos.filter((voto) => voto.candidato === candidato).length;
                console.log(`- ${candidato.nombre}: ${votosCandidato} votos`);
            });
    
            console.log(`Total votos válidos: ${votosNormales}`);
            console.log(`Total votos: ${votosNormales + votosEnBlanco}`);
        });
    }
}


let sistemaVotoElectronico1 = new SistemaVotoElectronico();

let partidoPolitico1 = new PartidoPolitico('Partido Libertad');
let partidoPolitico2 = new PartidoPolitico('Partido Peronista');

let votante1 = new Votante('Votante', 123256552);
let votante2 = new Votante('Votante2', 135655612);
let votante3 = new Votante('Votante3', 123454512);

let candidato1 = new Candidato("Candidato 1", partidoPolitico1);
let candidato2 = new Candidato("Candidato 2", partidoPolitico2);
let candidato3 = new Candidato("Candidato 3", partidoPolitico1);

partidoPolitico1.agregarCandidato(candidato1);
partidoPolitico1.agregarCandidato(candidato2);

const listaElectoral = new ListaElectoral();

listaElectoral.agregarCandidato(candidato1);
listaElectoral.agregarCandidato(candidato2);
listaElectoral.agregarCandidato(candidato3);

sistemaVotoElectronico1.agregarPartidoPolitico(partidoPolitico1.nombre);
sistemaVotoElectronico1.agregarPartidoPolitico(partidoPolitico2.nombre);

sistemaVotoElectronico1.agregarListaElectoral(listaElectoral);

sistemaVotoElectronico1.agregarVotante(votante1);
sistemaVotoElectronico1.agregarVotante(votante2);

sistemaVotoElectronico1.realizarVoto(votante1, candidato1);
sistemaVotoElectronico1.realizarVoto(votante1);
sistemaVotoElectronico1.realizarVoto(votante2);

sistemaVotoElectronico1.obtenerResultados();
