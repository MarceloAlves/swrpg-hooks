class Api::VotesController < ApplicationController
  def create
    @hook = Hook.find(params[:hook_id])
    if able_to_vote?
      @hook.increment!(:votes, 1)
      set_vote_timeout
      render json: { votes: @hook.votes, error: false, ttl: 0 }
    else
      ttl = Redis.current.ttl("votes:#{@hook.id}:#{request.remote_ip}")
      render json: { error: true, ttl: ttl }, status: 429
    end
  end

  private

  def able_to_vote?
    Redis.current.get("votes:#{@hook.id}:#{request.remote_ip}").nil?
  end

  def set_vote_timeout
    Redis.current.setex("votes:#{@hook.id}:#{request.remote_ip}", 5.minutes, 1)
  end
end
