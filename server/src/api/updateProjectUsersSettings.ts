import { isNil, prop, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { NodeType } from '~shared/types/domain/nodeType'
import { StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'
import { ProjectUsersSettings } from '~shared/types/forms/projectUsersSettings'
import { HttpError } from '~shared/types/httpError'
import { failOn } from '~shared/utils/failOn'

import { getDocument, toTreeNode } from '../services'
import { collection, Collections } from '../services/database'
import { nodeSettings } from './nodeSettings'

export const updateProjectUsersSettings: ServerApiMethod<'updateProjectUsersSettings'> = ({
  docId,
  email,
  payload: projectUsersSettings
}) =>
  getDocument(docId).then(async doc => {
    const tree = toTreeNode(doc.tree)

    const es = await nodeSettings({
      email,
      docId,
      payload: projectUsersSettings.emailId
    })

    const ps = await nodeSettings({
      email,
      docId,
      payload: projectUsersSettings.passwordId
    })

    if (es?.nodeType !== NodeType.String || ps?.nodeType !== NodeType.String) {
      throw new HttpError(400, 'modals.projectUserSettings.errors.invalidNodes')
    }

    if (es.validationType !== StringValidationType.Email) {
      throw new HttpError(400, 'modals.projectUserSettings.errors.emailType')
    }

    if (ps.validationType !== StringValidationType.Password) {
      throw new HttpError(400, 'modals.projectUserSettings.errors.passwordType')
    }

    const emailNode = tree.first(propEq('id', projectUsersSettings.emailId))
    const passNode = tree.first(propEq('id', projectUsersSettings.passwordId))

    if (
      emailNode?.closest(n => n.nodeType === NodeType.Array)?.value.id !==
      passNode?.closest(n => n.nodeType === NodeType.Array)?.value.id
    ) {
      throw new HttpError(400, 'modals.projectUserSettings.errors.invalidParent')
    }

    return collection(Collections.projectUsersSettings)
      .findOneAndReplace(
        { docId },
        { ...projectUsersSettings, docId },
        { upsert: true, returnDocument: 'after' }
      )
      .then(prop('value'))
      .then(failOn<ProjectUsersSettings>(isNil, 'failed to persists project user settings'))
  })
