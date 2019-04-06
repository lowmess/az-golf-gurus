import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import NetlifyForm from 'react-netlify-form'
import { Box, Flex, Text, Button, Card } from 'rebass'
import { Paragraph } from './Typography'
import { Label, Input, Textarea } from './FormElements'
import unwidow from '../utils/unwidow'

const ContactForm = props => {
  const { contentfulContactForm } = useStaticQuery(graphql`
    query {
      contentfulContactForm(entryTitle: { ne: "SCHEMA__ContactForm" }) {
        nameLabel
        namePlaceholder
        emailLabel
        emailPlaceholder
        messageLabel
        messagePlaceholder {
          messagePlaceholder
        }
        submitButtonLabel
        errorMessage {
          errorMessage
        }
        successMessage {
          successMessage
        }
      }
    }
  `)

  // Force data to always exist in case of query returning null
  const data = contentfulContactForm || {}

  const nameLabel = data.nameLabel || 'Name'
  const namePlaceholder = data.namePlaceholder || 'J. Smith'

  const emailLabel = data.emailLabel || 'Email'
  const emailPlaceholder = data.emailPlaceholder || 'jsmith@example.com'

  const messageLabel = data.messageLabel || 'Message'
  const messagePlaceholder =
    (data.messagePlaceholder && data.messagePlaceholder.messagePlaceholder) ||
    `I’d like to take two strokes off my golf game`

  const submitButtonLabel = data.submitButtonLabel || 'Send Message'

  const errorMessage =
    (data.errorMessage && data.errorMessage.errorMessage) ||
    `Oh no! Something went wrong. Please try again.`

  const successMessage =
    (data.successMessage && data.successMessage.successMessage) ||
    `Thank you for contacting us! We’ll get back to you as soon as we’re able.`

  return (
    <Box {...props}>
      <NetlifyForm name="Contact Form">
        {({ success, error }) => (
          <>
            {success && (
              <Paragraph mx="auto" textAlign="center">
                {unwidow(successMessage)}
              </Paragraph>
            )}

            {error && (
              <Card mb={[3, 4]} borderRadius={1} py={3} px={3} bg="reds.2">
                <Paragraph mx="auto" textAlign="center">
                  {unwidow(errorMessage)}
                </Paragraph>
              </Card>
            )}

            {!success && (
              <>
                <Flex flexDirection={['column', 'row']} mb={[3, 4]}>
                  <Box flex="1" mr={[0, 4]} mb={[3, 0]}>
                    <Label htmlFor="name">{nameLabel}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={namePlaceholder}
                      required
                    />
                  </Box>

                  <Box flex="1">
                    <Label htmlFor="email">{emailLabel}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={emailPlaceholder}
                      required
                    />
                  </Box>
                </Flex>

                <Label htmlFor="message">{messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={messagePlaceholder}
                  required
                />

                <Text mt={4} textAlign="center">
                  <Button type="submit" variant="primary">
                    {submitButtonLabel}
                  </Button>
                </Text>
              </>
            )}
          </>
        )}
      </NetlifyForm>
    </Box>
  )
}

export default ContactForm
