import { Pressable, Text, PressableProps, StyleProp, TextStyle } from "react-native";

export type PressableTextProps = PressableProps & {text: string, style?: StyleProp<TextStyle>}

export function PressableText(props: PressableTextProps) {
    return (
        <Pressable
            {...props}
        >
            <Text
                style={[props.style, { textDecorationLine: "underline" }]}>
                {props.text}
            </Text>
        </Pressable>
    )
}