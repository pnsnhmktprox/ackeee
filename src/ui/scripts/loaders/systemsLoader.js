import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSystems from '../enhancers/enhanceSystems'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchSystems${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchSystems($domainId: ID!, $sorting: Sorting!, $type: SystemType!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					systems(sorting: $sorting, type: $type, range: $range) {
						id
						count
						created
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		sorting: opts.sorting,
		range: opts.range,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.systems

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSystems
	}

}