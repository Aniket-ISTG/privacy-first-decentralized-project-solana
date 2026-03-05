use anchor_lang::prelude::*;

declare_id!("HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8");

#[program]
pub mod storage_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.storage;
        account.owner = ctx.accounts.user.key();
        account.files = Vec::new();
        Ok(())
    }

    pub fn add_entry(
        ctx: Context<AddEntry>,
        cid: String,
        encrypted_aes_key: String,
    ) -> Result<()> {
        let account = &mut ctx.accounts.storage;

        require!(
            account.files.len() < StorageAccount::MAX_FILES,
            StorageError::MaxFilesReached
        );

        require!(
            account.owner == ctx.accounts.user.key(),
            StorageError::Unauthorized
        );

        account.files.push(FileEntry {
            cid,
            encrypted_aes_key,
        });

        Ok(())
    }

    pub fn remove_entry(ctx: Context<RemoveEntry>, index: u64) -> Result<()> {
        let account = &mut ctx.accounts.storage;

        require!(
            account.owner == ctx.accounts.user.key(),
            StorageError::Unauthorized
        );

        require!(
            (index as usize) < account.files.len(),
            StorageError::InvalidIndex
        );

        account.files.remove(index as usize);

        Ok(())
    }

    pub fn get_entries(ctx: Context<GetEntries>) -> Result<Vec<FileEntry>> {
        let account = &ctx.accounts.storage;

        require!(
            account.owner == ctx.accounts.user.key(),
            StorageError::Unauthorized
        );

        Ok(account.files.clone())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + StorageAccount::MAX_SIZE,
        seeds = [b"storage", user.key().as_ref()],
        bump
    )]
    pub storage: Account<'info, StorageAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddEntry<'info> {
    #[account(
        mut,
        seeds = [b"storage", user.key().as_ref()],
        bump
    )]
    pub storage: Account<'info, StorageAccount>,

    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct RemoveEntry<'info> {
    #[account(
        mut,
        seeds = [b"storage", user.key().as_ref()],
        bump
    )]
    pub storage: Account<'info, StorageAccount>,

    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetEntries<'info> {
    #[account(
        seeds = [b"storage", user.key().as_ref()],
        bump
    )]
    pub storage: Account<'info, StorageAccount>,

    pub user: Signer<'info>,
}

#[account]
pub struct StorageAccount {
    pub owner: Pubkey,
    pub files: Vec<FileEntry>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FileEntry {
    pub cid: String,
    pub encrypted_aes_key: String,
}

#[error_code]
pub enum StorageError {
    #[msg("Maximum file limit reached")]
    MaxFilesReached,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Invalid index")]
    InvalidIndex,
}

impl StorageAccount {
    pub const MAX_FILES: usize = 20;
    pub const MAX_CID: usize = 64;
    pub const MAX_AES: usize = 256;

    pub const MAX_SIZE: usize =
        32 +
        4 + (Self::MAX_FILES * (4 + Self::MAX_CID + 4 + Self::MAX_AES));
}