/**
 * Tipos relacionados à autenticação e autorização
 */

/**
 * Perfis de usuário disponíveis no sistema
 */
export type UserRole = 'admin' | 'doctor' | 'patient';

/**
 * Interface base do usuário
 */
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}

/**
 * Interface do médico
 */
export interface Doctor extends BaseUser {
  role: 'doctor';
  specialty: string;
}

/**
 * Interface do paciente
 */
export interface Patient extends BaseUser {
  role: 'patient';
}

/**
 * Interface do administrador
 */
export interface Admin extends BaseUser {
  role: 'admin';
}

/**
 * Interface do usuário autenticado
 */
export type User = Admin | Doctor | Patient;

/**
 * Dados necessários para login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Dados necessários para registro
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * Resposta da API de autenticação
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
} 