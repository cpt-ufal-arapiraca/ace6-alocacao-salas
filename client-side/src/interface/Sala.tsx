export interface SalaInterface {
    "total": number,
    "quantidade": number,
    "salas": [
        {
            "sala_id": number,
            "codigo_sala": string,
            "tipo": string,
            "bloco": string,
            "capacidade": number
        }
    ]
}