# Custom Hooks

## Account Management Hooks

### `useAccountInitialization`
Manages the storage account initialization flow.

```javascript
import { useAccountInitialization } from "../hooks";

const { isInitializing, handleInitializeStorage } = useAccountInitialization();

// Usage:
handleInitializeStorage(wallet, setHasAccount);
```

**Returns:**
- `isInitializing` (boolean) - Loading state
- `handleInitializeStorage(wallet, setHasAccount)` - Handler function

**Features:**
- Validates wallet connection
- Shows success/error toasts
- Updates account state on completion

---

### `useAccountCheck`
Checks if user has an initialized storage account on wallet connect.

```javascript
import { useAccountCheck } from "../hooks";

const { setHasAccount } = useAccount();
useAccountCheck(setHasAccount);
```

**Parameters:**
- `setHasAccount` - Callback to update account state

**Features:**
- Automatic PDA existence check
- Handles wallet connect/disconnect
- Error handling and logging

---

## Future Hooks

As the project scales, add new hooks here:
- `useFileUpload` - File upload management
- `useFileRetrieval` - File download/decryption
- `useWalletBalance` - Wallet data management
- `useIPFSUpload` - IPFS interactions

## Hook Organization Best Practices

1. Keep hooks focused on single responsibilities
2. Handle side effects within hooks
3. Return clean, minimal interfaces
4. Document expected parameters and return values
