'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { IUserSession } from '@/interfaces/types';
import toast from 'react-hot-toast';

export const SessionButtons = () => {

    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const pathname = usePathname(); // Hook para obtener la ruta actual
    const router = useRouter();

    // Obtener la sesión del usuario desde las cookies para mostrar el menú de navegación correspondiente
    useEffect(() => {
        const dataCookie = Cookies.get('userData');
        if (dataCookie) {
            setUserSession(JSON.parse(dataCookie));
        } else {
            setUserSession(null);
        }
    }, [pathname]); // Se ejecuta cada vez que cambia la ruta

    const handleCerrarSesion = () => {
        Cookies.remove('userData'); // Eliminar la cookie
        setUserSession(null);
        toast.success('Sesión cerrada correctamente');
        router.push('/');
    }

    return (
        <>
            {!userSession ? (
                <div className="flex items-center justify-center text-xl font-bold text-white">
                    <Link href="/register" className="mr-4 cursor-pointer">Crear cuenta</Link>
                    <Link href="/login" className="mr-4 cursor-pointer">Iniciar sesión</Link>
                </div>
            ) : (
                <div className="flex items-center justify-center text-xl font-bold text-white">
                    <Link href="/dashboard" className="mr-4 cursor-pointer">Mi perfil</Link>
                    <Link href="/cart" className="mr-4 cursor-pointer">Carrito</Link>
                    <button
                        onClick={handleCerrarSesion}
                        className="cursor-pointer"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )
            }
        </>
    )
}
