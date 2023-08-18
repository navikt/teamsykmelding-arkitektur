import * as R from 'https://cdn.jsdelivr.net/npm/remeda@1.24.1/+esm'

export function getTeamSykmeldingAppNodes(applications, options) {
    return R.pipe(
        applications,
        R.flatMap((it) => {
            if (it.app.startsWith('macgyver') && !options.showMacgyver) return []

            const app = { id: `${it.app}-app`, label: `${it.app}`, group: it.namespace, shape: 'box' }

            if (it.databases) {
                return [
                    app,
                    ...it.databases.map((db) => {
                        const [first] = db.databases
                        return {
                            id: `${first}-db`,
                            font: { size: 12 },
                            label: `${first}`,
                            shape: 'hexagon',
                            icon: { code: '\uf1c0' },
                            parent: `${it.app}-app`,
                        }
                    }),
                ]
            }

            return [app]
        }),
    )
}
