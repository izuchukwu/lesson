import {
	Accordion,
	Stack,
	Text,
	Group,
	Button,
	CopyButton,
	Center,
	Title,
	Divider
} from '@mantine/core'
import {Spinner} from './Spinner'
import {ClipboardIcon, ExclamationTriangleIcon} from '@radix-ui/react-icons'

export type Lesson = {
	title: string
	sections: {name: string; lecture: string}[]
	questions: {question: string; answer: string}[]
}

type LessonViewerProps = {
	isLoading: boolean
	lesson?: Lesson
	duration?: number
	error?: string
}

export const LessonViewer = ({
	lesson,
	duration,
	isLoading,
	error
}: LessonViewerProps) => (
	<>
		{!isLoading && error && (
			<Center sx={{height: '100%'}}>
				<Stack
					align="center"
					sx={(theme) => ({
						gap: 5,
						color: theme.colors.red,
						textAlign: 'center'
					})}
				>
					<ExclamationTriangleIcon />
					<Text>{error}</Text>
				</Stack>
			</Center>
		)}
		{isLoading && (
			<Group
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}}
				position="center"
				align="center"
			>
				<Text>✍️</Text>
				<Spinner color="dark" />
			</Group>
		)}
		{!lesson && !error && !isLoading && (
			<Center sx={{height: '100%', opacity: 0.75}}>
				<Text color="dimmed" size="lg">
					Click &quot;Go&quot; to generate a lesson
				</Text>
			</Center>
		)}
		{!isLoading && lesson && (
			<>
				<Group position="apart">
					<Group align="center">
						<Title order={3}>{lesson.title}</Title>
					</Group>
					<CopyButton
						timeout={2000}
						value={`${lesson.title}
					
${lesson.sections.map(
	(section) => `${section.name}

${section.lecture}`
).join(`

`)}
					
Questions:
${lesson.questions.map(
	(question) => `${question.question}
${question.answer}`
).join(`

`)}`}
					>
						{({copied, copy}) => (
							<Button
								color={copied ? 'teal' : 'red'}
								variant="subtle"
								onClick={copy}
								leftIcon={<ClipboardIcon />}
							>
								{copied ? 'Copied' : 'Copy'}
							</Button>
						)}
					</CopyButton>
				</Group>
				<Divider orientation="horizontal" my={15} />
				<Stack>
					{lesson.sections.map((section, index) => (
						<Stack key={index}>
							<Text>
								<b>{section.name}</b>
							</Text>
							<Text>{section.lecture}</Text>
						</Stack>
					))}
				</Stack>
				<Divider orientation="horizontal" my={15} />
				<Text mb={15}>
					<b>Questions</b>
				</Text>
				<Accordion
					variant="contained"
					radius="md"
					multiple
					chevronPosition="left"
				>
					{lesson.questions.map((question, index) => (
						<Accordion.Item value={`${index}`} key={index}>
							<Accordion.Control>
								{question.question}
							</Accordion.Control>
							<Accordion.Panel>{question.answer}</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</>
		)}
	</>
)
