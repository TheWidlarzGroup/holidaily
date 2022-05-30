import { mkUseStyles } from 'utils/theme'

export const useModalStyles = mkUseStyles((theme) => ({
  bottomModal: {
    paddingVertical: theme.spacing.l,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.l2plus,
    marginTop: 'auto',
    borderTopLeftRadius: theme.borderRadii.l2min,
    borderTopRightRadius: theme.borderRadii.l2min,
    alignItems: 'center',
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
  nativeModalStyleReset: {
    margin: 0,
  },
}))
