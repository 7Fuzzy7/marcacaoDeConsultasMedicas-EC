/**
 * Tipos relacionados a consultas médicas
 * Este arquivo contém todas as definições de tipos necessárias para o gerenciamento de consultas
 */

/**
 * Representa uma consulta médica no sistema
 * @property id - Identificador único da consulta
 * @property doctorId - ID do médico que realizará a consulta
 * @property date - Data da consulta no formato YYYY-MM-DD
 * @property time - Horário da consulta no formato HH:mm
 * @property description - Descrição ou motivo da consulta
 * @property status - Status atual da consulta (agendada, realizada, cancelada)
 */
export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  description: string;
  status: string;
}; 