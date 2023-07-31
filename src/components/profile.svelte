<script context="module">
    import { session } from '$app/stores'
    import { goto } from '$app/navigation'
    
    export async function load({ session }) {
        if (!session.user) {
            return goto('/login');
        }
    
        return {
            props: {
                user: session.user
            }
        }
    }
    </script>
    
    <script>
    export let user;
    </script>
    
    <h1>Hello, {user.email}</h1>
    