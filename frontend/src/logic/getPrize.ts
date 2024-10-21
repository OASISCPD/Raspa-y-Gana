import { BaseUrl } from "./BaseUrl";

export interface Prize {
    error?: string;
    premio: string;
    status_code: number;
}

export async function getPrize(codigo: string): Promise<Prize> {
    try {
        const res = await fetch(`${BaseUrl}/obtener_premio?codigo_campana=${codigo}`, { credentials: 'include' as RequestCredentials });
        const data = await res.json();
        return data as Prize;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el premio'); // Manejo de error personalizado
    }
}

export async function fetchMailEnviado(): Promise<string | null> {
    const response = await fetch(`${BaseUrl}/mail_enviado`, { credentials: 'include' as RequestCredentials });
    const result = await response.json();
    return result.email;
}