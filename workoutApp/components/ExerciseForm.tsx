import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form"


export type ExerciseFormData = {
    name: string,
    duration: string,
    type: string,
    reps?: string,
}

type WorkoutProps = {
    onSubmit: (form: ExerciseFormData) => void,
}

const selectionItems = ["exercise", "break", "stretch"];

export default function ExerciseForm({ onSubmit }: WorkoutProps) {

    const { control, handleSubmit } = useForm();

    const [isSelectionOn, setSelectionOn] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="name"
                    render={({ field: { onChange, value } }) =>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                            placeholder="Pushups"
                        />

                    }
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="duration"
                    render={({ field: { onChange, value } }) =>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                            placeholder="Duration"
                        />

                    }
                />
            </View>
            <View style={styles.rowContainer}>
                <Controller
                    control={control}
                    rules={{ required: false }}
                    name="reps"
                    render={({ field: { onChange, value } }) =>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                            placeholder="Repetitions"
                        />

                    }
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="type"
                    render={({ field: { onChange, value } }) =>
                        <View style={{ flex: 1 }}>
                            {
                                isSelectionOn ?
                                    <View >
                                        {
                                            selectionItems.map(selection =>
                                                <PressableText text={selection}
                                                    key={selection}
                                                    style={styles.selection}
                                                    onPressIn={
                                                        () => {
                                                            onChange(selection);
                                                            setSelectionOn(false);
                                                        }
                                                    } />)
                                        }
                                    </View>
                                    :
                                    <TextInput
                                        onPressIn={() => setSelectionOn(true)}
                                        style={styles.input}
                                        placeholder="Type"
                                        value={value}
                                    />

                            }
                        </View>



                    }
                />
            </View>

            <PressableText text="Add Exercise"
            style={{marginTop:10}} onPress={
                handleSubmit(
                    (data) => {
                        onSubmit(data as ExerciseFormData)
                    })} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        margin: 2,
        borderWidth: 1,
        height: 30,
        padding: 5,
        borderRadius: 5,
        borderColor: "rgba(0,0,0,0.5)",
    },
    rowContainer: {
        flexDirection: "row",
    },
    selection: {
        margin: 2,
        padding: 3,
        alignSelf: "center",
    }
})