import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from '../BurgerConstructor.module.css';
import { REMOVE_INGREDIENT } from '../../../services/ContructorIngridients/actions';

function SelectIngredient({ data, index, moveIng }) {
    const dispatch = useDispatch();
    const { price, name, image_mobile, uuid } = data;
    const selectedIngredients = useSelector((state) => state['selectedIngredients'].selectedIngredients);
    const ref = useRef(null);

    const [, dropRef] = useDrop({
        accept: "selectIngredient",
        hover: (item, monitor) => {
            const hoverIndex = index;

            const dragCard = selectedIngredients.find(el => el.uuid === item.uuid);
            const dragIndex = selectedIngredients.indexOf(dragCard);

            if (dragIndex === hoverIndex) return;

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIng(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, dragRef] = useDrag({
        type: "selectIngredient",
        item: () => {
            return { uuid, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    dragRef(dropRef(ref));

    return (
        <div className={burgerConstructorStyles.ingridient} ref={ref} style={{ opacity }} >
            <DragIcon type="primary" />
            <ConstructorElement 
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={() => {
                    dispatch({
                        type: REMOVE_INGREDIENT,
                        payload: uuid,
                    });
                }}
            />
        </div>
    );
}

export default SelectIngredient;
