'use client';

import { getOrders } from "@/api/orderAPI";
import { IOrderListProps, IUserOrder } from "@/interfaces/types"
import { useEffect, useState } from "react";
import { OrderCard } from './OrderCard';

export const OrderList: React.FC<IOrderListProps> = ({ userToken }) => {
    const [userOrders, setUserOrders] = useState<IUserOrder[]>([]); // Estado para almacenar las ordenes del usuario

    useEffect(() => {
        if (!userToken) {
            return;
        }

        // Obtener las ordenes del usuario
        const fetchOrders = async () => {
            try {
                const orders = await getOrders(userToken);
                setUserOrders(orders);
            } catch (error) {
                console.error(error);
            }
        }

        fetchOrders();
    }, [userToken]); // Se ejecuta cada vez que cambia el token del usuario

    return (
        <div className="flex gap-4 flex-wrap justify-center items-center p-7">
            {userOrders.length === 0 ? (
                <p>No tienes ordenes.</p>
            ) : (
                userOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))
            )}
        </div>
    )
}