import { Router } from 'express'

export default function webhookRouter() {
  const router = Router()

  router.param('organization', this.validateOrganization)
  router.post('/:organization', this.processRequest, this.saveEvent)

  return router
}
