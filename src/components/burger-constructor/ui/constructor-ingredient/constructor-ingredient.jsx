import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteItem, moveItem } from "../../../../services/actions/burger-constructor";
import { DndItemTypes } from "../../../../utils/DndItemTypes"
import styles from './constructor-ingredient.module.css'
import PropTypes from "prop-types";
import { IngredientItemType } from "../../../../utils/prop-types";

export const ConstructorIngredient = ({ item, id, index }) => {
    const dispatch = useDispatch();

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: DndItemTypes.ItemSwap,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            dispatch(moveItem(dragIndex, hoverIndex));
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: DndItemTypes.ItemSwap,
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    return (
        <li ref={ref} className={`${styles.dragContainer} ${isDragging && styles.onDrag}`} data-handler-id={handlerId}>
            <DragIcon className='pr-2' type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => dispatch(deleteItem(item))}
            />
        </li>
    )
}

ConstructorIngredient.propTypes = {
    item: IngredientItemType.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}