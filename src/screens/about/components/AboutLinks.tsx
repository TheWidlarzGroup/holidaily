import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import StarIcon from 'assets/icons/icon-star.svg'
import ShieldCheckIcon from 'assets/icons/icon-shield-check.svg'
import { useTranslation } from 'react-i18next'
import { useModalContext } from 'contexts/ModalProvider'
import Modal from 'react-native-modal'
import { ModalHeader } from 'components/ModalHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconBack from 'assets/icons/icon-back2.svg'
import { useBooleanState } from 'hooks/useBooleanState'
import { linkWithFallback } from 'utils/linkWithFallback'
import { PrivacyPolicyContent } from './PrivacyPolicyContent'
import { Submit } from 'components/Submit'
import { CustomButton } from 'components/CustomButton'

const ANDROID_RATE_LINK = 'market://de tails?id=com.holidaily'
const COMPANY_WEBSITE_LINK = 'https://thewidlarzgroup.com'

export const AboutLinks = () => {
  const theme = useTheme()
  const { t } = useTranslation('about')
  const { showModal, hideModal } = useModalContext()
  return (
    <Box paddingHorizontal="m">
      <RateApp />

      <BaseOpacity
        bg="dashboardBackground"
        padding="m"
        borderRadius="lmin"
        marginTop="m"
        flexDirection="row"
        alignItems="center"
        onPress={() => showModal(<PrivacyPolicy hideModal={hideModal} />)}>
        <Text variant="textBoldSM" color="titleActive">
          {t('privacyPolicy')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}

const RateApp = () => {
  const { t } = useTranslation('about')
  const theme = useTheme()
  return (
    <Box padding="m" bg="secondaryOpaque" borderRadius="lmin">
      <Box flexDirection="row" alignItems="center">
        <Box bg="tertiaryOpaque" borderRadius="full">
          <StarIcon color={theme.colors.tertiary} />
        </Box>

        <Text marginLeft="m" variant="textBoldSM" color="titleActive" style={{ flex: 1 }}>
          {t('rateApp')}
        </Text>
      </Box>
      <BaseOpacity
        paddingVertical="xm"
        paddingHorizontal="l"
        marginTop="xm"
        bg="tertiary"
        borderRadius="full"
        alignSelf="center"
        onPress={async () => {
          await linkWithFallback(ANDROID_RATE_LINK, COMPANY_WEBSITE_LINK)
        }}
        style={{ marginLeft: 'auto' }}>
        <Text variant="buttonSM" color="white">
          {t('rateAppBtn')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}

const PrivacyPolicy = ({ hideModal }: { hideModal: F0 }) => {
  const theme = useTheme()
  const styles = useStyles()
  const [isVisible, { setFalse: fadeOut }] = useBooleanState(true)
  const { t } = useTranslation('about')
  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      animationInTiming={300}
      animationOutTiming={300}
      onModalHide={hideModal}
      hasBackdrop={false}
      isVisible={isVisible}
      style={{
        margin: 0,
        height: '100%',
      }}
      onBackButtonPress={fadeOut}
      onBackdropPress={fadeOut}>
      <SafeAreaView
        style={{
          height: '100%',
          backgroundColor: theme.colors.white,
        }}>
        <ModalHeader>
          <BaseOpacity
            onPress={fadeOut}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            paddingLeft="m">
            <IconBack height={18} width={18} color={styles.arrow.color} />
          </BaseOpacity>
          <Text variant="header" color="black">
            {t('privacyPolicy')}
          </Text>
          <Box paddingRight="xl" />
        </ModalHeader>

        <PrivacyPolicyContent />
      </SafeAreaView>
    </Modal>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
