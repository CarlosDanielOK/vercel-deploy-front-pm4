/* eslint-disable @next/next/no-img-element */
import { ICardProps } from '@/interfaces/types';
import Link from 'next/link';
import React from 'react';

export const Card: React.FC<ICardProps> = ({ product }) => {
    return (
        <Link href={`/product/${product.id}`}>
            <div className='cardContenedor'>
                <div className='cardImagenContenedor'>
                    <img src={product.image} alt={product.name} className='cardImagen' />
                </div>
                <div className='cardDetallesContenedor'>
                    <h2 className='font-bold text-xl'>{product.name}</h2>
                    <p className='font-bold text-xl'>${product.price}</p>
                    <p>Stock: {product.stock}</p>
                </div>
            </div>
        </Link>
    );
}