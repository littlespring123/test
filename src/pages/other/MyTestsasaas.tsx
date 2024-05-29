import { toRefs, toRef, ref, defineComponent } from "vue"

export default defineComponent({
	setup() {
		// const { title } = toRefs(props)
		// const title = toRef(props, "title")
		// const { title } = toRefs(props)
		const title = ref("")
		return (
			<>
				<button>{title.value}</button>
				<button>dsdad</button>
				<button>dsdad</button>
				<button>dsdad</button>
			</>
		)
	},
})
