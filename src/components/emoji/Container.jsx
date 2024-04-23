
import { useRef } from "react";
import { useEmoji } from "./useEmoji";
import "./styles.css";

export const Container = () => {
  const titleRef = useRef();

  const { menu, emoji, styles } = useEmoji(titleRef);
	
	return (
		<div className="title">
            <h1 ref={titleRef} style={styles}>
            This is a title
            {menu}
            {emoji}
            </h1>
        </div>
	);
}
