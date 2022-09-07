import {
	Text,
	Stack,
	Select,
	Box,
	TextInput,
	Group,
	Textarea,
	Button
} from '@mantine/core'

type LessonWriterProps = {
	level: string
	topic: string
	input: string

	onLevelChange?: (level: string) => void
	onTopicChange?: (level: string) => void
	onInputChange?: (input: string) => void
	onGo?: () => void
}

export const LessonWriter = ({
	level,
	topic,
	input,
	onLevelChange,
	onTopicChange,
	onInputChange,
	onGo
}: LessonWriterProps) => {
	return (
		<Stack sx={{height: '100%'}}>
			<Group position="apart">
				<Text sx={{fontWeight: 600}}>📕 Lesson</Text>
				<OptionsBar
					level={level}
					topic={topic}
					onLevelChange={onLevelChange}
					onTopicChange={onTopicChange}
					onGo={onGo}
				/>
			</Group>
			<Textarea
				placeholder="Enter lesson overview here"
				variant="unstyled"
				autosize={false}
				styles={(theme) => ({
					wrapper: {height: '100%'},
					input: {height: '100%'},
					root: {height: '100%'}
				})}
				size="md"
				onChange={(event) => onInputChange?.(event.currentTarget.value)}
				value={input}
			/>
		</Stack>
	)
}

/* -- Options Bar -- */

type OptionsBarProps = {
	level: string
	topic: string

	onLevelChange?: (level: string) => void
	onTopicChange?: (topic: string) => void

	onGo?: () => void
}

const OptionsBar = ({
	level,
	topic,
	onLevelChange,
	onTopicChange,
	onGo
}: OptionsBarProps) => {
	return (
		<Group>
			<Box sx={{width: 140}}>
				<Select
					data={[
						{value: 'novice', label: 'Novice'},
						{value: 'regular', label: 'Regular'},
						{value: 'extremely advanced', label: 'Advanced'},
						{value: 'phd', label: 'PhD'}
					]}
					value={level}
					onChange={onLevelChange}
					variant="filled"
					size="xs"
					radius="md"
					icon={
						<Text color="dimmed" size="xs" mt={1}>
							Level
						</Text>
					}
					iconWidth={50}
				/>
			</Box>
			<Box sx={{width: 140}}>
				<TextInput
					value={topic}
					onChange={(event) =>
						onTopicChange?.(event.currentTarget.value)
					}
					variant="filled"
					size="xs"
					radius="md"
					icon={
						<Text color="dimmed" size="xs" mt={1}>
							Topic
						</Text>
					}
					iconWidth={50}
				/>
			</Box>
			<Button size="xs" radius="md" onClick={onGo} color="red">
				Go
			</Button>
		</Group>
	)
}
