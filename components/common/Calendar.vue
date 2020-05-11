<template>
	<div class="u-calendar" :class="({ 'size-S': size === 'small' }, [addClass])">
		<input
			type="text"
			:id="id"
			:placeholder="placeholder"
			v-model="computedValue"
			readonly
			:disabled="isDisabled"
		/>
		<label :for="id" class="icon-calendar"></label>
		<input type="hidden" :value="minDate" />
		<input type="hidden" :value="maxDate" />
	</div>
</template>

<script>
export default {
	name: 'CommonCalendar',
	props: {
		size: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: 'id',
		},
		placeholder: {
			type: String,
			default: 'Select Date',
		},
		addClass: {
			type: Array,
			default: () => {},
		},
		isDisabled: {
			type: Boolean,
			default: false,
		},
		maxDate: {
			type: Date,
			default: () => {
				return;
			},
		},
		minDate: {
			type: Date,
			default: () => {
				return new Date(1900, 0, 1);
			},
		},
	},
	data: () => ({
		calendarProp: {
			stepMonths: 12,
			showOtherMonths: true,
			showAnim: 'slideDown',
			dateFormat: 'dd-M-yy',
			monthNames: [
				'01',
				'02',
				'03',
				'04',
				'05',
				'06',
				'07',
				'08',
				'09',
				'10',
				'11',
				'12',
			],
			maxDate: '',
			minDate: '',
		},
	}),
	computed: {
		computedValue: {
			get: function() {
				if (!this.value) {
					return '';
				}
				return this.$moment(this.value).format('DD-MMM-YYYY');
			},
			set: function(newValue) {
				this.$emit(
					'update:value',
					this.$moment(newValue, 'DD-MMM-YYYY').format('YYYYMMDD'),
				);
			},
		},
	},
	updated() {
		$(`#${this.id}`).datepicker('destroy');
		this.setting();
	},
	mounted() {
		this.setting();
	},
	beforeDestroy() {
		this.removeEventListener();
	},
	methods: {
		setting() {
			const calendarProp = {
				stepMonths: 12,
				showOtherMonths: true,
				showAnim: 'slideDown',
				dateFormat: 'dd-M-yy',
				monthNames: [
					'01',
					'02',
					'03',
					'04',
					'05',
					'06',
					'07',
					'08',
					'09',
					'10',
					'11',
					'12',
				],
				maxDate: this.maxDate,
				minDate: this.minDate,
			};

			$(`#${this.id}`)
				.datepicker(calendarProp)
				.on('change', e => {
					this.computedValue = e.target.value;
				});
		},
		removeEventListener() {
			$(`#${this.id}`).off('change');
		},
	},
};
</script>
