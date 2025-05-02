
export interface CreateOperatorLogDto {
    codigo: number;
    producto: number; 
    hora_inicio: string;
    hora_fin: string;
    unidades: number;
    año: number;
    semana: number;
    D_M_E: number;
    dia: number;
    D_M_P: number;
    hora: number;
    vencimiento: string;
    recorte: number;
  

  
    estado: string ;
    usuario: number; // o TurnoDto
    turno: number; // o TurnoDto
    maquina: number; // o MaquinaDto
}